function _deconstructPacket(data, buffers) {
        if (!data) return data;

        if (isBinary(data)) {
            var placeholder = {
                _placeholder: true,
                num: buffers.length,
            };
            buffers.push(data);
            return placeholder;
        } else if (Array.isArray(data)) {
            var newData = new Array(data.length);

            for (var i = 0; i < data.length; i++) {
                newData[i] = _deconstructPacket(data[i], buffers);
            }

            return newData;
        } else if (_typeof(data) === "object" && !(data instanceof Date)) {
            var _newData = {};

            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    _newData[key] = _deconstructPacket(data[key], buffers);
                }
            }

            return _newData;
        }

        return data;
    }