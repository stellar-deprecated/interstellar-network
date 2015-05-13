require('../styles/balance-widget.scss');

export class BalanceWidgetController {
  constructor(sessions) {
    if (sessions.hasDefault()) {
      let session = sessions.default;
      this.address = session.getAddress();
      this.balance = session.getAccount().balance;
      //console.log(session.getAccount());
      //console.log(this.balance);
    } else {
      this.address = 'no session';
    }
  }
}

BalanceWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("BalanceWidgetController", BalanceWidgetController);
};