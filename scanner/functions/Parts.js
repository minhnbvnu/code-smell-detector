function Parts(modelPtr) {
            var length = 0;
            this.count = _csm.getPartCount(modelPtr);
            length = _csm.getPartCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getPartIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getPartCount(modelPtr);
            this.opacities = new Float32Array(_em.HEAPF32.buffer, _csm.getPartOpacities(modelPtr), length);
            length = _csm.getPartCount(modelPtr);
            this.parentIndices = new Int32Array(_em.HEAP32.buffer, _csm.getPartParentPartIndices(modelPtr), length);
        }