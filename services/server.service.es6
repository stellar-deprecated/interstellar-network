import {Server as LibServer} from 'js-stellar-lib';

function Server(Config) {
  return new LibServer(Config.get('modules.mcs-stellard.horizon'));
}

Server.$inject = ['mcs-core.Config'];

module.exports = function(mod) {
  mod.service("Server", Server);
};
