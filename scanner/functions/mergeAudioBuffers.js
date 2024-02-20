function mergeAudioBuffers(config, cb) {
	            var numberOfAudioChannels = config.numberOfAudioChannels;

	            // todo: "slice(0)" --- is it causes loop? Should be removed?
	            var leftBuffers = config.leftBuffers.slice(0);
	            var rightBuffers = config.rightBuffers.slice(0);
	            var sampleRate = config.sampleRate;
	            var internalInterleavedLength = config.internalInterleavedLength;

	            if (numberOfAudioChannels === 2) {
	                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
	                rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
	            }

	            if (numberOfAudioChannels === 1) {
	                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
	            }

	            function mergeBuffers(channelBuffer, rLength) {
	                var result = new Float64Array(rLength);
	                var offset = 0;
	                var lng = channelBuffer.length;

	                for (var i = 0; i < lng; i++) {
	                    var buffer = channelBuffer[i];
	                    result.set(buffer, offset);
	                    offset += buffer.length;
	                }

	                return result;
	            }

	            function interleave(leftChannel, rightChannel) {
	                var length = leftChannel.length + rightChannel.length;

	                var result = new Float64Array(length);

	                var inputIndex = 0;

	                for (var index = 0; index < length;) {
	                    result[index++] = leftChannel[inputIndex];
	                    result[index++] = rightChannel[inputIndex];
	                    inputIndex++;
	                }
	                return result;
	            }

	            function writeUTFBytes(view, offset, string) {
	                var lng = string.length;
	                for (var i = 0; i < lng; i++) {
	                    view.setUint8(offset + i, string.charCodeAt(i));
	                }
	            }

	            // interleave both channels together
	            var interleaved;

	            if (numberOfAudioChannels === 2) {
	                interleaved = interleave(leftBuffers, rightBuffers);
	            }

	            if (numberOfAudioChannels === 1) {
	                interleaved = leftBuffers;
	            }

	            var interleavedLength = interleaved.length;

	            // create wav file
	            var resultingBufferLength = 44 + interleavedLength * 2;

	            var buffer = new ArrayBuffer(resultingBufferLength);

	            var view = new DataView(buffer);

	            // RIFF chunk descriptor/identifier 
	            writeUTFBytes(view, 0, 'RIFF');

	            // RIFF chunk length
	            view.setUint32(4, 44 + interleavedLength * 2, true);

	            // RIFF type 
	            writeUTFBytes(view, 8, 'WAVE');

	            // format chunk identifier 
	            // FMT sub-chunk
	            writeUTFBytes(view, 12, 'fmt ');

	            // format chunk length 
	            view.setUint32(16, 16, true);

	            // sample format (raw)
	            view.setUint16(20, 1, true);

	            // stereo (2 channels)
	            view.setUint16(22, numberOfAudioChannels, true);

	            // sample rate 
	            view.setUint32(24, sampleRate, true);

	            // byte rate (sample rate * block align)
	            view.setUint32(28, sampleRate * 2, true);

	            // block align (channel count * bytes per sample) 
	            view.setUint16(32, numberOfAudioChannels * 2, true);

	            // bits per sample 
	            view.setUint16(34, 16, true);

	            // data sub-chunk
	            // data chunk identifier 
	            writeUTFBytes(view, 36, 'data');

	            // data chunk length 
	            view.setUint32(40, interleavedLength * 2, true);

	            // write the PCM samples
	            var lng = interleavedLength;
	            var index = 44;
	            var volume = 1;
	            for (var i = 0; i < lng; i++) {
	                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
	                index += 2;
	            }

	            if (cb) {
	                return cb({
	                    buffer: buffer,
	                    view: view
	                });
	            }

	            postMessage({
	                buffer: buffer,
	                view: view
	            });
	        }