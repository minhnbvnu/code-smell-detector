function __embind_register_memory_view(rawType, dataTypeIndex, name) {
          var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
          var TA = typeMapping[dataTypeIndex];
          function decodeMemoryView(handle) {
            handle = handle >> 2;
            var heap = HEAPU32;
            var size = heap[handle >>> 0];
            var data = heap[handle + 1 >>> 0];
            return new TA(heap.buffer, data, size);
          }
          name = readLatin1String(name);
          registerType(rawType, { name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true });
        }