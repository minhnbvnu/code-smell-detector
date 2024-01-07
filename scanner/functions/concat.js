function concat(texts) {
            return texts.map(function (t) {
                return t.text;
            }).join('');
        }