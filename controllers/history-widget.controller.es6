import {Account, Server} from 'js-stellar-lib';
import {Inject} from 'mcs-core';
import {find} from 'lodash';
require('../styles/history-widget.scss');

@Inject("$scope", "mcs-stellard.Sessions", "mcs-stellard.Server")
export class HistoryWidgetController {
  constructor($scope, Sessions, Server) {
    if (!Sessions.hasDefault()) {
      console.error('No session. This widget should be used with active session.');
      return;
    }

    this.$scope = $scope;
    let session = Sessions.default;
    let address = session.getAddress();

    Server.accounts(address, "transactions")
      .then(response => {
        this.transactions = response.records;
        $scope.$apply()
      })
      .then(() => {
        Server.accounts(address, "transactions", {
          streaming: {
            onmessage: transaction => {
              this.onTransaction.call(this, transaction);
            }
          }
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => $scope.$apply());
  }

  onTransaction(transaction) {
    if (find(this.transactions, t => t.id === transaction.id)) {
      return;
    }
    this.transactions.unshift(transaction);
    this.$scope.$apply();
  }
}

module.exports = function(mod) {
  mod.controller("HistoryWidgetController", HistoryWidgetController);
};
