let historyWidget = function () {
  return {
    restrict: "E",
    transclude: true,
    templateUrl: "mcs-stellard/history-widget"
  }
};

module.exports = function(mod) {
  mod.directive("history", historyWidget);
};
