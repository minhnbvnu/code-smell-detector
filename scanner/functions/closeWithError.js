function closeWithError(destination, error2) {
              if (typeof destination.error === "function") {
                destination.error(error2);
              } else {
                destination.close();
              }
            }