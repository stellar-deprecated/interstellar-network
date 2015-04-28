let sendWidget = function () {
  return {
    restrict: "E",
    templateUrl: "mcs-stellard/send-widget",
    scope: true
  }
};

module.exports = function(mod) {
  mod.directive("send", sendWidget);
};
