import {Account, Server} from 'js-stellar-lib';
import {MismatchedAddressError} from '../errors';

export class Session {
  constructor({address, secret, data, permanent}) {
    // Testing
    //this.account = Account.fromSeed('sf6iYQoSZhKVcrZxRKVgH2qcsbNkjNnVwfEbKrLjZ5ifMigJZ7P');

    this.address    = address;
    this.secret     = secret;
    this.data       = data;
    this.permanent  = permanent;
  }

  loadAccount() {
    let server = new Server({
      secure: true,
      hostname: 'horizon-testnet.stellar.org',
      port: 443
    });

    return server.loadAccount('gsqzN96A8y3k4EkXrNiXp1ww7JuHFaX5w1t7SHsiqkW7ob6xGzD'/*this.address*/)
      .then(account => {
        this.account = account;
      });
  }

  getAccount() {
    return this.account;
  }

  getAddress() {
    return this.address;
  }

  getSecret() {
    return this.secret;
  }

  isPermanent() {
    return this.permanent;
  }

  getData() {
    return this.data;
  }

  destroy() {
    this.account = null;
    this.data = null;
  }
}