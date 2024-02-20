function cleanOld() {
            if (_previousEl) {
              _previousEl.remove();
            }

            if (_currentScope) {
              _currentScope.$destroy();
            }
          }