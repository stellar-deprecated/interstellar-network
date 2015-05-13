require('../styles/pre-send-widget.scss');

import {Intent} from "mcs-core";

class PreSendWidgetController {
  constructor(IntentBroadcast) {
    this.IntentBroadcast = IntentBroadcast;
  }

  go() {
    this.IntentBroadcast.sendBroadcast(
      new Intent(
        Intent.TYPES.SEND_TRANSACTION,
        {destination: this.destination}
      )
    );
  }
}

PreSendWidgetController.$inject = ["mcs-core.IntentBroadcast"];

module.exports = mod => {
  mod.controller("PreSendWidgetController", PreSendWidgetController);
};
