let _          = require("lodash");
let stellarLib = require('stellar-lib');

window.stellar = stellarLib;

export class NetworkConnection {
  constructor($q, network, name, connectionSpec) {
    this.$q             = $q;
    this.network        = network;
    this.name           = name;
    this.connectionSpec = connectionSpec;
    this.connected      = false;
    this._remote        = new stellarLib.Remote(connectionSpec, true);

    this._remote.on('connected', () => {
      /*jshint camelcase: false */
      // TODO: need to figure out why this isn't being set when we connect to the stellard
      this._remote._reserve_base=50*1000000;
      this._remote._reserve_inc=10*1000000;
      this.connected = true;
      this.network.onConnected(this);

      if(this.waitingForConnection) {
        this.waitingForConnection.resolve(this);
      }
    });

    this._remote.on('connecting',   () => this.network.onConnecting(this));
    this._remote.on('disconnected', () => this.network.onDisconnected(this));
    this._remote.on('reconnecting', (t) => this.network.onReconnecting(this, t));
    this._remote.on('transaction',  (tx) => this.network.onTransaction(this, tx)); 
  }

  disconnect() {
    this._remote.disconnect();
    this.connected = false;
    
    this._remote.removeAllListeners('connected');
    this._remote.removeAllListeners('disconnected');
    this._remote.removeAllListeners('reconnecting');
    this._remote.removeAllListeners('connecting');
    this._remote.removeAllListeners('transaction');

  }

  forceReconnect() {
    /* jshint camelcase:false */
    this._remote.force_reconnect();
  }

  ensureConnected() {
    if (this.connected) { 
      return this.$q.when(this);
    } else if (this.waitingForConnection) {
      return this.waitingForConnection.promise;
    } else {
      this.waitingForConnection = this.$q.defer();
      this._remote.connect();
      return this.waitingForConnection.promise;
    }
  }

  sendRequest(method, params) {
    let req = new stellarLib.Request(this._remote, method);

    // fold the params into the message object
    _.extend(req.message, params);

    var deferred = this.$q.defer();

    req.on('success', deferred.resolve);
    req.on('error',   deferred.reject);
    req.request();

    return deferred.promise;
  }

  sendTransaction(tx) {
    let deferred = this.$q.defer();

    tx.on('success', deferred.resolve);
    tx.on('error',   deferred.reject);
    tx.submit();

    return deferred.promise;
  }
}