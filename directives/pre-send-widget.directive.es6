let preSendWidget = function () {
  return {
    restrict: "E",
    transclude: true,
    templateUrl: "mcs-stellard/pre-send-widget"
  }
};

module.exports = function(mod) {
  mod.directive("preSend", preSendWidget);
};
