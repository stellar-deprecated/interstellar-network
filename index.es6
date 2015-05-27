import {Module, Intent} from "mcs-core";
import mcsStellarApi from "mcs-stellar-api";
import moduleDatastore from "./util/module-datastore.es6";

const mod = new Module('mcs-stellard');
export default mod;

mod.use(mcsStellarApi);
mod.use(require('angular-cookies'));

mod.controllers = require.context("./controllers", true);
mod.directives  = require.context("./directives", true);
mod.services    = require.context("./services", true);
mod.templates   = require.context("raw!./templates", true);

let registerBroadcastReceivers = (IntentBroadcast, Sessions) => {
  IntentBroadcast.registerReceiver(Intent.TYPES.SEND_TRANSACTION, intent => {
    moduleDatastore.set('destinationAddress', intent.data.destination);
  });

  IntentBroadcast.registerReceiver(Intent.TYPES.LOGOUT, intent => {
    Sessions.destroyAll();
  });
};
registerBroadcastReceivers.$inject = ["mcs-core.IntentBroadcast", "mcs-stellard.Sessions"];
mod.run(registerBroadcastReceivers);

let addConfig = ConfigProvider => {
  ConfigProvider.addModuleConfig(mod.name, {
    horizon: {
      secure: true,
      hostname: "horizon-testnet.stellar.org",
      port: 443
    }
  });
};
addConfig.$inject = ['mcs-core.ConfigProvider'];
mod.config(addConfig);

mod.define();

export * from "./errors";
