require('../styles/balance-widget.scss');

export class BalanceWidgetController {
  constructor(sessions) {
    if (sessions.hasDefault()) {
      let session = sessions.default;
      this.address = session.getAddress();
      console.log(session.getAccount().balances);
    } else {
      this.address = 'no session';
    }
    this.balance = 0;
  }
}

BalanceWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("BalanceWidgetController", BalanceWidgetController);
};