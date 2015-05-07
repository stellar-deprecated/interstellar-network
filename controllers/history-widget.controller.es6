import {Account} from 'js-stellar-lib';

require('../styles/history-widget.scss');

export class HistoryWidgetController {
  constructor(sessions) {
    if (sessions.hasDefault()) {
      let session = sessions.default;
      this.address = session.getAddress();
    } else {
      this.address = 'no session';
    }
  }
}

HistoryWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("HistoryWidgetController", HistoryWidgetController);
};
