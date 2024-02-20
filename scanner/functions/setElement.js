function setElement(element) {
                if (angular.isElement(element) && _element !== element) {
                    _element = element;
                    // clear out the chartWrapper because we're going to need a new one
                    _chartWrapper = null;
                    _needsUpdate = true;
                }
            }