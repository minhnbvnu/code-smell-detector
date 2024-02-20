function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
                if (!exactInput) {
                    to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
                }
                if (to === false) {
                    return false;
                }
                updateHandlePosition(handleNumber, to);
                return true;
            }