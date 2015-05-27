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

export default new ModuleDatastore();
