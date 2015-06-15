import {Inject, Service} from 'interstellar-core'
import {Server as LibServer} from 'js-stellar-lib';

@Service('Server')
@Inject('interstellar-core.Config')
export default class Server {
  constructor(Config) {
    return new LibServer(Config.get('modules.interstellar-network.horizon'));
  }
}
