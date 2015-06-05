import {Module, Intent} from "interstellar-core";
import interstellarSessions from "interstellar-sessions";

const mod = new Module('interstellar-network');
export default mod;

mod.services = require.context("./services", true);

let addConfig = ConfigProvider => {
  ConfigProvider.addModuleConfig(mod.name, {
    horizon: {
      secure: true,
      hostname: "horizon-testnet.stellar.org",
      port: 443
    }
  });
};
addConfig.$inject = ['interstellar-core.ConfigProvider'];
mod.config(addConfig);

mod.define();
