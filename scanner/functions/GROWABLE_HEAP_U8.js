function GROWABLE_HEAP_U8() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAPU8;
        }