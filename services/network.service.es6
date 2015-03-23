let _                     = require('lodash');
let { NetworkConnection } = require("../lib/network-connection");

/**
 The Network service is used to communicate with the Stellar network.

 @namespace  stellard.Network 
 */
import { ConnectionNotFoundError } from "../errors";

class Network {
  constructor($rootScope, $timeout, $q, config) {
    this.$rootScope           = $rootScope;
    this.$timeout             = $timeout;
    this.$q                   = $q;
    this.config               = config;
    this.connections          = {};
  }

  shutdown() {
    this.connections.forEach(r => r.disconnect());
    this.connections.clear();
  }

  ensureConnected(name) {
    try {
      return this._getConnection(name).ensureConnected();
    } catch(e) {
      return this.$q.reject(e);
    }
  }

  get(name) {
    return this._getConnection(name);
  }

  forceReconnect(name) {
    let connection = this.connections[name];
    connection.forceReconnect();
  }

  // NetworkConnection callbacks
  
  onConnecting(connection) {
    this._safeBroadcast('stellar-network:connecting', connection.name);
  }

  onConnected(connection) {
    this._safeBroadcast('stellar-network:connected', connection.name);
  }

  onDisconnected(connection) {
    this._safeBroadcast('stellar-network:disconnected', connection.name);
  }

  onReconnecting(connection, timeout) {
    this._safeBroadcast('stellar-network:reconnecting', connection.name, timeout);
  }

  onTransaction(connection, tx) {
    this._safeBroadcast('stellar-network:transaction', connection.name, tx);
  }

  _getConnection(name) {
    if(!this.connections[name]) {
      let config = this._getConnectionSpec(name);
      this.connections[name] = new NetworkConnection(this.$q, this, name, config);
    }

    return this.connections[name];
  }

  _getConnectionSpec(name) {
    let configKey = `stellard/connections/${name}`;
    let connectionSpec = this.config.get(configKey);

    if (!connectionSpec) {
      throw new ConnectionNotFoundError(`No connection config found at key: ${configKey}`);
    }

    return connectionSpec;
  }

  _safeBroadcast(event, ...args) {
    this.$timeout(() => {
      this.$rootScope.$broadcast(event, ...args);
    });
  }
}

Network.$inject = ["$rootScope", "$timeout", "$q", 'mcs-core.Config'];

module.exports = function(mod) {
  mod.service("Network", Network);
};