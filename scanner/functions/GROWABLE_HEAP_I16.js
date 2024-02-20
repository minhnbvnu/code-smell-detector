function GROWABLE_HEAP_I16() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAP16;
        }