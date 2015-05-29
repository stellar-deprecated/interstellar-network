require('../styles/send-widget.scss');

import {Inject, Intent} from 'mcs-core';
import {Account, Currency, Keypair, Operation, TransactionBuilder} from 'js-stellar-lib';
import moduleDatastore from "../util/module-datastore.es6";

@Inject("mcs-stellard.Sessions", "mcs-stellard.Server")
class SendWidgetController {
  constructor(Sessions, Server) {
    if (!Sessions.hasDefault()) {
      console.error('No session');
      return;
    }

    this.Server = Server;
    this.Sessions = Sessions;
    this.session = Sessions.default;
    this.destinationAddress = moduleDatastore.get('destinationAddress');
    this.errors = [];
  }

  send() {
    this.errors = [];

    if (!Account.isValidAddress(this.destinationAddress)) {
      this.errors.push('Destination address is not valid.');
      return;
    }

    if (!this.session.getAccount()) {
      this.Sessions.loadDefaultAccount()
        .then(() => {
          if (!this.session.getAccount()) {
            this.errors.push('Your account is not funded.');
            return;
          }
          this._send();
        });
    } else {
      this._send();
    }
  }

  _send() {
    let currency = Currency.native();
    let amount = this.amount * 1000000;
    let transaction = new TransactionBuilder(this.session.getAccount())
      .addOperation(Operation.payment({
        destination: this.destinationAddress,
        currency: currency,
        amount: amount
      }))
      .addSigner(Keypair.fromSeed(this.session.getSecret()))
      .build();

    this.Server.submitTransaction(transaction)
      .then(transactionResult => {
        alert('Transaction sent!');
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

module.exports = function(mod) {
  mod.controller("SendWidgetController", SendWidgetController);
};
