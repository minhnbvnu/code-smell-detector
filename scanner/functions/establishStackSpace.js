function establishStackSpace() {
          var pthread_ptr = _pthread_self();
          var stackTop = GROWABLE_HEAP_I32()[pthread_ptr + 52 >>> 2];
          var stackSize = GROWABLE_HEAP_I32()[pthread_ptr + 56 >>> 2];
          var stackMax = stackTop - stackSize;
          _emscripten_stack_set_limits(stackTop, stackMax);
          stackRestore(stackTop);
        }