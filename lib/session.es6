let { AddressSecretPair }     = require("../lib/address-secret-pair");
let { MismatchedSecretError } = require("../errors");

export class Session {
  constructor(address, secret, connection) {
    this.address = address;
    this.secret = secret;
    this.connection = connection;
  }

  withSecret(secret) {
    let source = new AddressSecretPair(secret);

    if (source.address !== this.address) {
      throw new MismatchedSecretError();
    }

    return new Session(source.address, source.secret, this.connection);
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

  destroy() {
    //TODO: any cleanup needed 
  }

  //TODO: add helper methods here.  getBalance, etc.
}