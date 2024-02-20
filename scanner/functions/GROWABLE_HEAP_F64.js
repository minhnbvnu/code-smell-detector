function GROWABLE_HEAP_F64() {
          if (wasmMemory.buffer != HEAP8.buffer) {
            updateMemoryViews();
          }
          return HEAPF64;
        }