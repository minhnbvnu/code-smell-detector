function saveSliceBySlice(cacheKey, count, key, dataStr, numSlices, dataSliceSize, duration, cb) {
        var operation = {op: 'set', args: []};
        operation.args.push(cacheKey + count);
        operation.args.push(dataStr.substr(count * dataSliceSize, dataSliceSize));
        operation.args.push(duration);
        operation.args.push(function (err, result) {
            if (err || !result) {
                self.emit(cacheEvents.ERROR, {key:key, error:err || "unknown"});
                return cb({message:'failed', data:{key:key, data:dataStr, duration:duration}, error:err
                    || "unknown"});
            }
            count++;
            if (count == numSlices) {
                self.emit(cacheEvents.NEW, {key:key, duration:duration});
                return cb(null, {message:'success', data:result});
            }
            else {
                return saveSliceBySlice(cacheKey, count, key, dataStr, numSlices, dataSliceSize, duration, cb);
            }
        });

        blockIfBusyDoOp(operation);
    }