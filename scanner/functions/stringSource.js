function stringSource(s) {
            var i=0; return function() {
                return i < s.length ? s.charCodeAt(i++) : null;
            };
        }