function decodeMemoryView(handle) {
            handle = handle >> 2;
            var heap = HEAPU32;
            var size = heap[handle >>> 0];
            var data = heap[handle + 1 >>> 0];
            return new TA(heap.buffer, data, size);
          }