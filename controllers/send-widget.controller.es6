import {Account, Currency, Server, TransactionBuilder} from 'js-stellar-lib';

export class SendWidgetController {
  constructor(sessions, $stateParams) {
    this.destination = $stateParams.destination;
    if (sessions.hasDefault()) {
      this.session = sessions.default;
    } else {
      console.error('No session');
    }
  }

  send() {
    let server = new Server({
      hostname: 'https://horizon-testnet.stellar.org',
      port: 443
    });
    let currency = Currency.native();

    let transaction = new TransactionBuilder(this.session.getAccount())
      .payment(this.destinationAddress, currency, this.amount)
      .build();
    server.submitTransaction(transaction)
      .then(response => {
        console.log(response);
        alert('Transaction sent!');
      });
  }
}

SendWidgetController.$inject = ["mcs-stellard.Sessions", "$stateParams"];

module.exports = function(mod) {
  mod.controller("SendWidgetController", SendWidgetController);
};