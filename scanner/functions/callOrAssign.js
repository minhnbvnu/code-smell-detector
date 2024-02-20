function callOrAssign(value) {
        if (typeof scope.selectedObject === 'function') {
          scope.selectedObject(value, scope.selectedObjectData);
        }
        else {
          scope.selectedObject = value;
        }

        if (value) {
          handleRequired(true);
        }
        else {
          handleRequired(false);
        }
      }