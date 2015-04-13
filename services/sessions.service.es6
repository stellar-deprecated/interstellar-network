let { AddressSecretPair }          = require("../lib/address-secret-pair");
let { Transaction }                = require("stellar-lib");
let { SessionAlreadyDefinedError } = require("../errors");
let { SessionNotFoundError }       = require("../errors");
let { Session }                    = require("../lib/session");

import * as _ from 'lodash';

const DEFAULT = 'default';

class Sessions {
  constructor(network, $cookieStore) {
    this.network = network;
    this.$cookieStore = $cookieStore;
    this.sessions = {};
    _.forEach(this.$cookieStore.get('sessions'), (params, name) => this.create(name, params));
  }

  get default() {
    return this.get(DEFAULT);
  }

  createDefault(params={}) {
    this.create(DEFAULT, params);
  }

  hasDefault() {
    return this.has(DEFAULT);
  }

  create(name, params={}) {
    if(this.sessions[name]) {
      throw new SessionAlreadyDefinedError(`A session name "${name}" has already been created`);
    }

    if(!params.connectionName) {
      params.connectionName = "live";
    }

    params.connection = this.network.get(params.connectionName);

    if (params.secret) {
      let pair = new AddressSecretPair(params.secret);

      if (params.address && pair.address !== params.address) {
        throw new MismatchedAddressError();
      }

      params.address = pair.address;
    }

    this.sessions[name] = new Session(params);
    this._updateSessionCookie();
  }

  get(name) {
    let result = this.sessions[name];
    if (!result) { throw new SessionNotFoundError(`No session named "${name}"`); }
    return result;
  }

  has(name) {
    return !!this.sessions[name];
  }

  destroy(name) {
    let session = this.sessions[name];
    if (session) {
      session.destroy();
    }
    delete this.sessions[name];
    this._updateSessionCookie();
  }

  _updateSessionCookie() {
    let permanentSessions = {};
    _.forEach(this.sessions, (session, name) => {
      if (!session.isPermanent()) {
        return;
      }
      permanentSessions[name] = _.pick(session, ['address', 'secret', 'connectionName', 'data', 'permanent']);
    });
    this.$cookieStore.put('sessions', permanentSessions);
  }
}

Sessions.$inject = ["mcs-stellard.Network", "$cookieStore"];

module.exports = function(mod) {
  mod.service("Sessions", Sessions);
};