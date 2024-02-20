function GROWABLE_HEAP_F32() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAPF32;
        }