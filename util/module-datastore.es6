class ModuleDatastore {
  constructor() {
    this.data = {};
  }

  set(name, value) {
    this.data[name] = value;
  }

  get(name) {
    return this.data[name];
  }
}

let datastore = new ModuleDatastore();
module.exports = datastore;
