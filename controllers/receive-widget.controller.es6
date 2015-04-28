export class ReceiveWidgetController {
  constructor(sessions) {
    if (sessions.hasDefault()) {
      let session = sessions.default;
      this.address = session.getAddress();
    } else {
      this.address = 'no session';
    }
  }
}

ReceiveWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("ReceiveWidgetController", ReceiveWidgetController);
};