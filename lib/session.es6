import {Account, Server} from 'js-stellar-lib';
import {MismatchedAddressError} from '../errors';

export class Session {
  constructor({username, address, account, secret, data, permanent}) {
    this.username  = username;
    this.address   = address;
    this.account   = account;
    this.secret    = secret;
    this.data      = data;
    this.permanent = permanent;
  }

  getAccount() {
    return this.account;
  }

  setAccount(account) {
    this.account = account;
  }

  getUsername() {
    return this.username;
  }

  getAddress() {
    return this.address;
  }

  getSecret() {
    return this.secret;
  }

  isPermanent() {
    return !!this.permanent;
  }

  getData() {
    return this.data;
  }

  destroy() {
    this.username = null;
    this.account = null;
    this.address = null;
    this.secret = null;
    this.data = null;
  }
}