function RegisteredPointer_destructor(ptr) {
          if (this.rawDestructor) {
            this.rawDestructor(ptr);
          }
        }