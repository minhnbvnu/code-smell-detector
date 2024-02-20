function read_json(path) {
        const data = (0, exports.read)(path);
        if (data == null)
            return undefined;
        else {
            try {
                return JSON.parse(data);
            }
            catch {
                return undefined;
            }
        }
    }