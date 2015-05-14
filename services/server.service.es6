import {Server as LibServer} from 'js-stellar-lib';

function Server() {
  return new LibServer({
    secure: true,
    hostname: 'horizon-testnet.stellar.org',
    port: 443
  });
}

module.exports = function(mod) {
  mod.service("Server", Server);
};
