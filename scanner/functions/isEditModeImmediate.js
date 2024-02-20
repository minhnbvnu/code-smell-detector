function isEditModeImmediate(type){
      var widget = dashboard.widgets[type];
      return widget && widget.edit && widget.edit.immediate;
    }