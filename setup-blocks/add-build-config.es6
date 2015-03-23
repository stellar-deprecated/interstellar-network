
module.exports = function (configProvider) {
  configProvider.addLayer('stellard-connections', {
    stellard: {
      connections: {
        live: {
          trusted:        true,
          websocket_ip:   "live.stellar.org",
          websocket_port: 9001,
          websocket_ssl:  true
        },
        test: {
          trusted:        true,
          websocket_ip:   "test.stellar.org",
          websocket_port: 9001,
          websocket_ssl:  true
        },
        local: {
          trusted:        true,
          websocket_ip:   "localhost",
          websocket_port: 9001,
          websocket_ssl:  false
        },
      }
    }
  });
};

module.exports.$inject = ['mcs-core.ConfigProvider'];
module.exports.phase = 'config';