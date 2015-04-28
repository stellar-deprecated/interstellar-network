export class PreSendWidgetController {
  constructor($state) {
    this.$state = $state;
  }

  go() {
    this.$state.go('send', {
      destination: this.destination
    });
  }
}

PreSendWidgetController.$inject = ["$state"];

module.exports = function(mod) {
  mod.controller("PreSendWidgetController", PreSendWidgetController);
};