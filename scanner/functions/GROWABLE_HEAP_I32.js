function GROWABLE_HEAP_I32() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAP32;
        }