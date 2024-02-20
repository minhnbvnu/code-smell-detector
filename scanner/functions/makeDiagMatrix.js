function makeDiagMatrix(elements, anti) {
        var length = elements.length;
        var matrix = [];
        for (var i = 0; i < length; i++) {
            matrix.push(Array(anti ? length - i : i + 1).join('&') +
                '\\mqty{' + elements[i] + '}');
        }
        return matrix.join('\\\\ ');
    }