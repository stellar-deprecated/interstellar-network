import {Account, Server} from 'js-stellar-lib';

require('../styles/history-widget.scss');

export class HistoryWidgetController {
  constructor($scope, Sessions, Server) {
    if (!Sessions.hasDefault()) {
      console.error('No session. This widget should be used with active session.');
      return;
    }

    let session = Sessions.default;
    let address = session.getAddress();

    Server.accounts(address, "transactions")
      .then(response => {
        //response.records[0].account().then(account => console.log(account));
        this.transactions = response.records;
        $scope.$apply();
      })
      .catch(error => {
        console.error(error);
      });
  }
}

HistoryWidgetController.$inject = ["$scope", "mcs-stellard.Sessions", "mcs-stellard.Server"];

module.exports = function(mod) {
  mod.controller("HistoryWidgetController", HistoryWidgetController);
};
