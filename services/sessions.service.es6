let { AddressSecretPair }          = require("../lib/address-secret-pair");
let { Transaction }                = require("stellar-lib");
let { SessionAlreadyDefinedError } = require("../errors");
let { SessionNotFoundError }       = require("../errors");
let { Session }                    = require("../lib/session");

const DEFAULT = 'default';

class Sessions {
  constructor(network) {
    this.network = network;
    this.sessions = {};
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

    let {address, secret, connectionName} = params;

    if(!connectionName) {
      connectionName = "live";
    }

    let connection = this.network.get(connectionName);

    if (secret) {
      let pair = new AddressSecretPair(secret);

      if (address && pair.address !== address) {
        throw new MismatchedAddressError();
      }

      address = pair.address;
    }

    let session = new Session(address, secret, connection);

    this.sessions[name] = session;
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
    delete this.sessions[name];
    if(session) { session.destroy(); }
  }
}

Sessions.$inject = ["mcs-stellard.Network"];

module.exports = function(mod) {
  mod.service("Sessions", Sessions);
};