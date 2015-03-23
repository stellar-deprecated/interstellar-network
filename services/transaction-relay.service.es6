let { Transaction }            = require("stellar-lib");
let { TransactionFailedError } = require("../errors");

class TransactionRelay {
  constructor(network) {
    this.network = network;
  }

  relay(blob) {
    return this.network.get("live")
      .ensureConnected()
      .then(nc => nc.sendRequest("submit", {tx_blob: blob}))
      .then(result => {
        if(result.engine_result === "tesSUCCESS") {
          return result;
        } else {
          throw new TransactionFailedError(result);
        }    
      })
      ;
  }
}

TransactionRelay.$inject = ['mcs-stellard.Network'];

module.exports = function(mod) {
  mod.service("TransactionRelay", TransactionRelay);
};