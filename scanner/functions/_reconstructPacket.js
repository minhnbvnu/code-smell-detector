function _reconstructPacket(data, buffers) {
        if (!data) return data;

        if (data && data._placeholder === true) {
            var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;

            if (isIndexValid) {
                return buffers[data.num]; // appropriate buffer (should be natural order anyway)
            } else {
                throw new Error("illegal attachments");
            }
        } else if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                data[i] = _reconstructPacket(data[i], buffers);
            }
        } else if (_typeof(data) === "object") {
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    data[key] = _reconstructPacket(data[key], buffers);
                }
            }
        }

        return data;
    }