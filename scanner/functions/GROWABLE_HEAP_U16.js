function GROWABLE_HEAP_U16() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAPU16;
        }