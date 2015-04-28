import {SessionAlreadyDefinedError} from "../errors";
import {SessionNotFoundError} from "../errors";
import {Session} from "../lib/session";
import * as _ from 'lodash';

const DEFAULT = 'default';

class Sessions {
  constructor($cookieStore) {
    this.$cookieStore = $cookieStore;
    this.sessions = {};
    _.forEach(this.$cookieStore.get('sessions'), (params, name) => this.create(name, params));
  }

  get default() {
    return this.get(DEFAULT);
  }

  createDefault(params={}) {
    this.create(DEFAULT, params);
  }

  hasDefault() {
    return this.has(DEFAULT);
  }

  create(name, params={}) {
    if(this.sessions[name]) {
      throw new SessionAlreadyDefinedError(`A session name "${name}" has already been created`);
    }

    this.sessions[name] = new Session(params);
    this._updateSessionCookie();
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

  _updateSessionCookie() {
    let permanentSessions = {};
    _.forEach(this.sessions, (session, name) => {
      if (!session.isPermanent()) {
        return;
      }
      permanentSessions[name] = _.pick(session, ['address', 'secret', 'data', 'permanent']);
    });
    this.$cookieStore.put('sessions', permanentSessions);
  }
}

Sessions.$inject = ["$cookieStore"];

module.exports = function(mod) {
  mod.service("Sessions", Sessions);
};