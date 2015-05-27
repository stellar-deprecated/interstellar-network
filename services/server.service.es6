import {Inject} from 'mcs-core'
import {Server as LibServer} from 'js-stellar-lib';

@Inject('mcs-core.Config')
class Server {
  constructor(Config) {
    return new LibServer(Config.get('modules.mcs-stellard.horizon'));
  }
}

module.exports = function(mod) {
  mod.service("Server", Server);
};
