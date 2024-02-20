function handleInputChange(newval, initial) {
        if (newval) {
          if (typeof newval === 'object') {
            scope.searchStr = extractTitle(newval);
            callOrAssign({originalObject: newval});
          } else if (typeof newval === 'string' && newval.length > 0) {
            scope.searchStr = newval;
          } else {
            if (console && console.error) {
              console.error('Tried to set ' + (!!initial ? 'initial' : '') + ' value of angucomplete to', newval, 'which is an invalid value');
            }
          }

          handleRequired(true);
        }
      }