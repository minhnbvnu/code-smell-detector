function CanvasInfo(modelPtr) {
            if (!modelPtr) {
                return;
            }
            // Preserve the pointer ant heap for get data throw args.
            var _canvasSize_data = new Float32Array(2);
            var _canvasSize_nDataBytes = _canvasSize_data.length * _canvasSize_data.BYTES_PER_ELEMENT;
            var _canvasSize_dataPtr = _csm.malloc(_canvasSize_nDataBytes);
            var _canvasSize_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasSize_dataPtr, _canvasSize_nDataBytes);
            _canvasSize_dataHeap.set(new Uint8Array(_canvasSize_data.buffer));
            var _canvasOrigin_data = new Float32Array(2);
            var _canvasOrigin_nDataBytes = _canvasOrigin_data.length * _canvasOrigin_data.BYTES_PER_ELEMENT;
            var _canvasOrigin_dataPtr = _csm.malloc(_canvasOrigin_nDataBytes);
            var _canvasOrigin_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasOrigin_dataPtr, _canvasOrigin_nDataBytes);
            _canvasOrigin_dataHeap.set(new Uint8Array(_canvasOrigin_data.buffer));
            var _canvasPPU_data = new Float32Array(1);
            var _canvasPPU_nDataBytes = _canvasPPU_data.length * _canvasPPU_data.BYTES_PER_ELEMENT;
            var _canvasPPU_dataPtr = _csm.malloc(_canvasPPU_nDataBytes);
            var _canvasPPU_dataHeap = new Uint8Array(_em.HEAPU8.buffer, _canvasPPU_dataPtr, _canvasPPU_nDataBytes);
            _canvasPPU_dataHeap.set(new Uint8Array(_canvasPPU_data.buffer));
            // Call function and get result
            _csm.readCanvasInfo(modelPtr, _canvasSize_dataHeap.byteOffset, _canvasOrigin_dataHeap.byteOffset, _canvasPPU_dataHeap.byteOffset);
            _canvasSize_data = new Float32Array(_canvasSize_dataHeap.buffer, _canvasSize_dataHeap.byteOffset, _canvasSize_dataHeap.length);
            _canvasOrigin_data = new Float32Array(_canvasOrigin_dataHeap.buffer, _canvasOrigin_dataHeap.byteOffset, _canvasOrigin_dataHeap.length);
            _canvasPPU_data = new Float32Array(_canvasPPU_dataHeap.buffer, _canvasPPU_dataHeap.byteOffset, _canvasPPU_dataHeap.length);
            this.CanvasWidth = _canvasSize_data[0];
            this.CanvasHeight = _canvasSize_data[1];
            this.CanvasOriginX = _canvasOrigin_data[0];
            this.CanvasOriginY = _canvasOrigin_data[1];
            this.PixelsPerUnit = _canvasPPU_data[0];
            // Free heap memory
            _csm.free(_canvasSize_dataHeap.byteOffset);
            _csm.free(_canvasOrigin_dataHeap.byteOffset);
            _csm.free(_canvasPPU_dataHeap.byteOffset);
        }