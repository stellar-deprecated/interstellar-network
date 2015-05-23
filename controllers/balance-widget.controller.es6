require('../styles/balance-widget.scss');
import {sortBy} from 'lodash';

export class BalanceWidgetController {
  constructor($scope, Sessions, Server) {
    if (!Sessions.hasDefault()) {
      console.error('No session. This widget should be used with active session.');
      return;
    }

    let session = Sessions.default;
    let address = session.getAddress();
    Server.accounts(address)
      .then(account => {
        if (!account) {
          this.balances = {balance: 0, currency_type: 'native'};
        } else {
          this.balances = sortBy(account.balances, balance => balance.currency_type !== 'native');
          this.balances[0].balance = Math.floor(this.balances[0].balance/1000000);
        }
        $scope.$apply();
      })
      .catch(error => {
        console.error(error);
      });
  }
}

BalanceWidgetController.$inject = ["$scope", "mcs-stellard.Sessions", "mcs-stellard.Server"];

module.exports = function(mod) {
  mod.controller("BalanceWidgetController", BalanceWidgetController);
};
