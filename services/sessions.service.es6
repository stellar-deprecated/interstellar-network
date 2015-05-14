import {SessionAlreadyDefinedError} from "../errors";
import {SessionNotFoundError} from "../errors";
import {Session} from "../lib/session";
import * as _ from 'lodash';

const DEFAULT = 'default';

class Sessions {
  constructor($cookieStore, Server) {
    this.$cookieStore = $cookieStore;
    this.Server = Server;
    this.sessions = {};
    _.forEach(this.$cookieStore.get('sessions'), (params, name) => this.create(name, params));
  }

  get default() {
    return this.get(DEFAULT);
  }

  createDefault(params={}) {
    return this.create(DEFAULT, params);
  }

  hasDefault() {
    return this.has(DEFAULT);
  }

  create(name, params={}) {
    if(this.sessions[name]) {
      throw new SessionAlreadyDefinedError(`A session name "${name}" has already been created`);
    }

    let session = new Session(params);
    this.sessions[name] = session;
    return this.Server.loadAccount(params.address)
      .then(account => {
        session.setAccount(account);
        this._updateSessionCookie();
      });
  }

  get(name) {
    let result = this.sessions[name];
    if (!result) { throw new SessionNotFoundError(`No session named "${name}"`); }
    return result;
  }

  has(name) {
    return !!this.sessions[name];
  }

  destroy(name) {
    let session = this.sessions[name];
    if (session) {
      session.destroy();
    }
    delete this.sessions[name];
    this._updateSessionCookie();
  }

  destroyAll() {
    _.forEach(this.sessions, (session, name) => {
      this.destroy(name);
    });
  }

  _updateSessionCookie() {
    let permanentSessions = {};
    _.forEach(this.sessions, (session, name) => {
      if (!session.isPermanent()) {
        return;
      }
      permanentSessions[name] = _.pick(session, ['username', 'address', 'secret', 'data', 'permanent']);
    });
    this.$cookieStore.put('sessions', permanentSessions);
  }
}

Sessions.$inject = ["$cookieStore", "mcs-stellard.Server"];

module.exports = function(mod) {
  mod.service("Sessions", Sessions);
};