import {Account, Server} from 'js-stellar-lib';
import {MismatchedAddressError} from '../errors';

export class Session {
  constructor({address, secret, data, permanent}) {
    this.account = Account.fromSeed(secret);
    if (this.account.masterKeypair.address() !== address) {
      // TODO uncomment
      //throw new MismatchedAddressError();
    }
    let server = new Server({
      hostname: 'horizon-testnet.stellar.org',
      port: 443
    });

    server.loadAccount(this.account)
      .then(() => console.log('Account loaded'));

    this.data       = data;
    this.permanent  = permanent;
  }

  get address() {
    return this.account.masterKeypair.address();
  }

  get secret() {
    // TODO allow creating `protected` sessions - password is required to decrypt secret
    return this.account.masterKeypair.seed();
  }

  getAccount() {
    return this.account;
  }

  getAddress() {
    return this.address;
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