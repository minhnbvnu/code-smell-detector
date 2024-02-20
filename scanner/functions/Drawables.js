function Drawables(modelPtr) {
            this._modelPtr = modelPtr;
            var length = 0;
            var length2 = null;
            this.count = _csm.getDrawableCount(modelPtr);
            length = _csm.getDrawableCount(modelPtr);
            this.ids = new Array(length);
            var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIds(modelPtr), length);
            for (var i = 0; i < _ids.length; i++) {
                this.ids[i] = _em.UTF8ToString(_ids[i]);
            }
            length = _csm.getDrawableCount(modelPtr);
            this.constantFlags = new Uint8Array(_em.HEAPU8.buffer, _csm.getDrawableConstantFlags(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.dynamicFlags = new Uint8Array(_em.HEAPU8.buffer, _csm.getDrawableDynamicFlags(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.textureIndices = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableTextureIndices(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.drawOrders = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableDrawOrders(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.renderOrders = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableRenderOrders(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.opacities = new Float32Array(_em.HEAPF32.buffer, _csm.getDrawableOpacities(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.maskCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableMaskCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.vertexCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.indexCounts = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableIndexCounts(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            this.multiplyColors = new Float32Array(_em.HEAPF32.buffer, _csm.getDrawableMultiplyColors(modelPtr), length * 4);
            length = _csm.getDrawableCount(modelPtr);
            this.screenColors = new Float32Array(_em.HEAPF32.buffer, _csm.getDrawableScreenColors(modelPtr), length * 4);
            length = _csm.getDrawableCount(modelPtr);
            this.parentPartIndices = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableParentPartIndices(modelPtr), length);
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableMaskCounts(modelPtr), length);
            this.masks = new Array(length);
            var _masks = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableMasks(modelPtr), length);
            for (var i = 0; i < _masks.length; i++) {
                this.masks[i] = new Int32Array(_em.HEAP32.buffer, _masks[i], length2[i]);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            this.vertexPositions = new Array(length);
            var _vertexPositions = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableVertexPositions(modelPtr), length);
            for (var i = 0; i < _vertexPositions.length; i++) {
                this.vertexPositions[i] = new Float32Array(_em.HEAPF32.buffer, _vertexPositions[i], length2[i] * 2);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
            this.vertexUvs = new Array(length);
            var _vertexUvs = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableVertexUvs(modelPtr), length);
            for (var i = 0; i < _vertexUvs.length; i++) {
                this.vertexUvs[i] = new Float32Array(_em.HEAPF32.buffer, _vertexUvs[i], length2[i] * 2);
            }
            length = _csm.getDrawableCount(modelPtr);
            length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableIndexCounts(modelPtr), length);
            this.indices = new Array(length);
            var _indices = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIndices(modelPtr), length);
            for (var i = 0; i < _indices.length; i++) {
                this.indices[i] = new Uint16Array(_em.HEAPU16.buffer, _indices[i], length2[i]);
            }
        }