import {Module} from "mcs-core";
import {mod as mcsStellarApi} from "mcs-stellar-api";

export const mod = new Module('mcs-stellard');

mod.use(mcsStellarApi.name);
mod.use(require('angular-cookies'));

mod.controllers = require.context("./controllers", true);
mod.directives  = require.context("./directives", true);
mod.services    = require.context("./services", true);
mod.templates   = require.context("raw!./templates", true);
mod.setupBlocks = require.context("./setup-blocks", true);

mod.define();

export * from "./errors";
