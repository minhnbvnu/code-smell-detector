function reprocess() {
        try {
            katex.render(input.value, math);
        } catch (e) {
            if (e.__proto__ == katex.ParseError.prototype) {
                console.error(e);
            } else {
                throw e;
            }
        }
    }