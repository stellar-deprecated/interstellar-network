let { AddressSecretPair }     = require("../lib/address-secret-pair");
let { MismatchedSecretError } = require("../errors");

export class Session {
  constructor({address, secret, connection, data, permanent}) {
    this.address    = address;
    this.secret     = secret;
    this.connection = connection;
    this.data       = data;
    this.permanent  = permanent;
  }

  get connectionName() {
    return this.connection.name;
  }

  withSecret(secret) {
    let source = new AddressSecretPair(secret);

    if (source.address !== this.address) {
      throw new MismatchedSecretError();
    }

    return new Session(source.address, source.secret, this.connection, this.data);
  }

  sendRequest(...args) {
    return this.connection.sendRequest(...args);
  }

  sendTransaction(...args) {
    return this.connection.sendTransaction(...args);
  }

  ensureConnected() {
    return this.connection.ensureConnected().then(() => this);
  }

  isPermanent() {
    return this.permanent;
  }

  getData() {
    return this.data;
  }

  destroy() {
    this.secret = null;
    this.data = null;
  }

  //TODO: add helper methods here.  getBalance, etc.
}