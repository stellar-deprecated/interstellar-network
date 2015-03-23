import { Module, mod as mcsCore } from "mcs-core";

export const mod = new Module('mcs-stellard');

mod.use(mcsCore.name);

mod.services    = require.context("./services",     true);
mod.setupBlocks = require.context("./setup-blocks", true);

mod.define();

export * from "./errors";
export { AddressSecretPair } from "./lib/address-secret-pair";

export let lib = require("stellar-lib");
