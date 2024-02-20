function hashValuesToArray(obj) {
        var a = [];
        for (var key in obj) {
            a.push(obj[key]);
        }
        return a;
    }