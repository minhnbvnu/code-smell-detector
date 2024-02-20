function checkApplyFunction(apply, check){
      dashboard.widgets['test'].edit.apply = apply;

      openEditMode();

      // call save dialog method
      $uibModal.opts.scope.saveDialog();

      // TODO find better way as timeout
      $scope.$digest();
      check();
    }