require('../styles/receive-widget.scss');
import {Inject} from 'mcs-core';

@Inject("$scope", "mcs-stellard.Sessions", "mcs-stellard.Server")
class ReceiveWidgetController {
  constructor($scope, Sessions, Server) {
    if (!Sessions.hasDefault()) {
      console.error('Active session is required by this widget.');
      return;
    }
    this.$scope = $scope;
    this.Server = Server;
    this.session = Sessions.default;
    this.username = this.session.getUsername();
    this.address = this.session.getAddress();
    this.friendbotSent = false;
  }

  friendbot() {
    this.Server.friendbot(this.session.getAddress())
      .then(() => {
        this.friendbotSent = true;
        this.$scope.$apply();
      })
  }
}

module.exports = function(mod) {
  mod.controller("ReceiveWidgetController", ReceiveWidgetController);
};
