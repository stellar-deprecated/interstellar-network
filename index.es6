import {Module, Intent} from "mcs-core";
import {mod as mcsStellarApi} from "mcs-stellar-api";
import * as moduleDatastore from "./util/module-datastore.es6";

export const mod = new Module('mcs-stellard');

mod.use(mcsStellarApi.name);
mod.use(require('angular-cookies'));

mod.controllers = require.context("./controllers", true);
mod.directives  = require.context("./directives", true);
mod.services    = require.context("./services", true);
mod.templates   = require.context("raw!./templates", true);
mod.setupBlocks = require.context("./setup-blocks", true);

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

mod.define();

export * from "./errors";
