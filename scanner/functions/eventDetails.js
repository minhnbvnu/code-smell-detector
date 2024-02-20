function eventDetails(ev) {
    $scope.event = ev;
    $ionicModal.fromTemplateUrl('templates/timeline-modal.html', {
        scope: $scope, // give ModalCtrl access to this scope
        animation: 'slide-in-up',
        id: 'analyze',

      })
      .then(function (modal) {
        $scope.modal = modal;

        $scope.modal.show();

      });
  }