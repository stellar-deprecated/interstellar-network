let balanceWidget = function () {
  return {
    restrict: "E",
    transclude: true,
    templateUrl: "mcs-stellard/balance-widget"
  }
};

module.exports = function(mod) {
  mod.directive("balance", balanceWidget);
};
