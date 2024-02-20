function parseErrorLog(errLog) {
            var result = [];
            errLog.split('\n').forEach(function (errMsg) {
                if (errMsg.length < 5) {
                    return;
                }
                var parts = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(errMsg);
                if (parts) {
                    result.push(new ShaderError(parts[1] | 0, parts[2] | 0, parts[3].trim()));
                }
                else if (errMsg.length > 0) {
                    result.push(new ShaderError('unknown', 0, errMsg));
                }
            });
            return result;
        }