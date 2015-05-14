require('../styles/receive-widget.scss');

export class ReceiveWidgetController {
  constructor(sessions) {
    if (!sessions.hasDefault()) {
      console.error('Active session is required by this widget.');
      return;
    }
    let session = sessions.default;
    this.username = session.getUsername();
    this.address = session.getAddress();
  }
}

ReceiveWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("ReceiveWidgetController", ReceiveWidgetController);
};
