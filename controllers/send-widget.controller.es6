require('../styles/send-widget.scss');

import {Intent} from 'mcs-core';
import {Account, Currency, Keypair, Operation, TransactionBuilder} from 'js-stellar-lib';
import * as moduleDatastore from "../util/module-datastore.es6";

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
  }

  send() {
    if (!this.session.getAccount()) {
      this.Sessions.loadDefaultAccount()
        .then(() => {
          if (!this.session.getAccount()) {
            alert('Account not funded.');
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
    let transaction = new TransactionBuilder(this.session.getAccount())
      .addOperation(Operation.payment({
        destination: this.destinationAddress,
        currency: currency,
        amount: this.amount
      }))
      .addSigner(Keypair.fromSeed(this.session.getSecret()))
      .build();

    this.Server.submitTransaction(transaction)
      .then(transactionResult => {
        console.log(transactionResult);
        alert('Transaction sent!');
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

SendWidgetController.$inject = ["mcs-stellard.Sessions", "mcs-stellard.Server"];

module.exports = function(mod) {
  mod.controller("SendWidgetController", SendWidgetController);
};