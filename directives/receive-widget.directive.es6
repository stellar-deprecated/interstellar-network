let receiveWidget = function () {
  return {
    restrict: "E",
    transclude: true,
    templateUrl: "mcs-stellard/receive-widget"
  }
};

module.exports = function(mod) {
  mod.directive("receive", receiveWidget);
};
