function openEditMode(){
      compileTemplate(directive);
      $rootScope.$broadcast('adfWidgetEnterEditMode', dashboard.widgets['test']);

      // check for edit mode template
      expect($uibModal.opts.templateUrl).toBe('../src/templates/widget-edit.html');
      // check for correct widget in edit scope
      expect($uibModal.opts.scope.definition.wid).toBe('1');
    }