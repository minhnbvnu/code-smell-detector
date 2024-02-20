function captureBoundaryErrorDetailsDev(boundary, error2) {
              {
                var errorMessage;
                if (typeof error2 === "string") {
                  errorMessage = error2;
                } else if (error2 && typeof error2.message === "string") {
                  errorMessage = error2.message;
                } else {
                  errorMessage = String(error2);
                }
                var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
                lastBoundaryErrorComponentStackDev = null;
                boundary.errorMessage = errorMessage;
                boundary.errorComponentStack = errorComponentStack;
              }
            }