let { AddressSecretPair } = require("../lib/address-secret-pair");
let { Transaction }       = require("stellar-lib");

class OfflineSigner {
  constructor() {}

  sign(sourceSecret, destinationAddress, sourceSequence, amount, options={}) {
    let {fee} = options;

    if(!fee) {
      fee = 10;
    }

    let tx = new Transaction({
      max_fee: Infinity,
      canonical_signing: true,
      local_signing: true
    });

    let source = new AddressSecretPair(sourceSecret);

    tx.payment(
      source.address, 
      destinationAddress, 
      amount
    );

    tx.secret(source.secret);
    tx.tx_json.Fee = fee;
    tx.tx_json.Sequence = sourceSequence;
    tx.complete();
    tx.sign();
    
    return tx.serialize().to_hex();
  }
}

OfflineSigner.$inject = [];

module.exports = function(mod) {
  mod.service("OfflineSigner", OfflineSigner);
};