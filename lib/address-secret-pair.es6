let stellarLib = require('stellar-lib');

export class AddressSecretPair {
  constructor(seed) {
    /*jshint camelcase: false */

    this.stellarSeed = new stellar.Seed();

    if (seed) {
      this.stellarSeed.parse_json(seed);
    } else {
      this.stellarSeed.random();
    }
  }

  get secret() {
    return this.stellarSeed.to_json();
  }

  get address() {
    return this.stellarSeed
      .get_key()
      .get_address()
      .to_json()
      ;
  }
}