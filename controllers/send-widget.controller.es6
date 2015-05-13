require('../styles/send-widget.scss');

import {Intent} from 'mcs-core';
import {Account, Currency, Operation, Server, TransactionBuilder} from 'js-stellar-lib';
import * as moduleDatastore from "../util/module-datastore.es6";

class SendWidgetController {
  constructor(sessions) {
    if (!sessions.hasDefault()) {
      console.error('No session');
      return;
    }

    this.session = sessions.default;
    this.destinationAddress = moduleDatastore.get('destinationAddress');
  }

  static setDestinationAddress(destinationAddress) {
    console.log(destinationAddress);
  }

  send() {
    let server = new Server({
      secure: true,
      hostname: 'horizon-testnet.stellar.org',
      port: 443
    });
    let currency = Currency.native();

    var transaction = new TransactionBuilder(this.session.getAccount())
      .addOperation(Operation.payment({
        destination: this.destinationAddress,
        currency: currency,
        amount: this.amount
      }))
      .build();

    server.submitTransaction(transaction)
      .then(transactionResult => {
        console.log(transactionResult);
        alert('Transaction sent!');
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

SendWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("SendWidgetController", SendWidgetController);
};