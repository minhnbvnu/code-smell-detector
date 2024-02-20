function GROWABLE_HEAP_U32() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAPU32;
        }