function GROWABLE_HEAP_I8() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAP8;
        }