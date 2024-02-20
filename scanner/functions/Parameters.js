function Parameters(modelPtr) {
            var length = 0;
            var length2 = null;
            this.count = _csm.getParameterCount(modelPtr);
            length = _csm.getParameterCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getParameterIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getParameterCount(modelPtr);
            this.minimumValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterMinimumValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.types = new Int32Array(_em.HEAP32.buffer, _csm.getParameterTypes(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.maximumValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterMaximumValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.defaultValues = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterDefaultValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.values = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterValues(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            this.keyCounts = new Int32Array(_em.HEAP32.buffer, _csm.getParameterKeyCounts(modelPtr), length);
            length = _csm.getParameterCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getParameterKeyCounts(modelPtr), length);
            this.keyValues = new Array(length);
            var _keyValues = new Uint32Array(_em.HEAPU32.buffer, _csm.getParameterKeyValues(modelPtr), length);
            for (var i = 0; i < _keyValues.length; i++) {
                this.keyValues[i] = new Float32Array(_em.HEAPF32.buffer, _keyValues[i], length2[i]);
            }
        }