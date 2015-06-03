import {Inject} from 'interstellar-core'
import {Server as LibServer} from 'js-stellar-lib';

@Inject('interstellar-core.Config')
class Server {
  constructor(Config) {
    return new LibServer(Config.get('modules.interstellar-network.horizon'));
  }
}

module.exports = function(mod) {
  mod.service("Server", Server);
};
