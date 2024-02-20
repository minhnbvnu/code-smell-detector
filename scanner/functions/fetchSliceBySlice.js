function fetchSliceBySlice(cacheKey, count, key, slices, numSlices, cb) {
        if (count == numSlices) {
            var dataStr = slices.join('');
            try {
                var result = JSON.parse(dataStr);
                self.emit(cacheEvents.HIT, {key:key});
                return cb(null, {message:'success', data:result});
            }
            catch (e) {
                self.emit(cacheEvents.MISS, {key:key, error:e});
                return cb({message:'failed - bad JSON', data:{key:key}, error:e});
            }
        }
        else {
            var operation = {op: 'get', args: []};
            operation.args.push(cacheKey + count);
            operation.args.push(function (err, slice) {
                if (err) {
                    self.emit(cacheEvents.MISS, {key:key, error:err});
                    return cb({message:'failed', data:{key:key}, error:err});
                }
                else if (slice) {
                    slices.push(slice);
                    return fetchSliceBySlice(cacheKey, count+1, key, slices, numSlices, cb);
                }
                else {
                    self.emit(cacheEvents.MISS, {key:key, error:'unexpected result', result:slice});
                    return cb({message:'failed', data:{key:key}, error:'unexpected result', result:slice});
                }
            });
            blockIfBusyDoOp(operation);
        }
    }