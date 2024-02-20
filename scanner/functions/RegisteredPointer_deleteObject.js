function RegisteredPointer_deleteObject(handle) {
          if (handle !== null) {
            handle["delete"]();
          }
        }