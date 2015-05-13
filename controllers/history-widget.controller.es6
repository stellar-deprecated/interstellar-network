import {Account, Server} from 'js-stellar-lib';

require('../styles/history-widget.scss');

export class HistoryWidgetController {
  constructor(sessions) {
    if (!sessions.hasDefault()) {
      console.error('No session. This widget should be used with active session.');
      return;
    }

    return;
    let session = sessions.default;
    this.address = session.getAddress();

    var streamingMessageHandler = message => {
      console.log(message);
    };

    var server = new Server({
      secure: true,
      hostname: 'horizon-testnet.stellar.org',
      port: 443
    });
    var eventSource = null;
    server.accounts(session.getAddress(), "transactions", {
        streaming: {
          onmessage: streamingMessageHandler
        }
      })
      .then(function (es) {
        eventSource = es;
        console.log(eventSource);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

HistoryWidgetController.$inject = ["mcs-stellard.Sessions"];

module.exports = function(mod) {
  mod.controller("HistoryWidgetController", HistoryWidgetController);
};
