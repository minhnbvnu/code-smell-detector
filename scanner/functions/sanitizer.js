function sanitizer(str) {
            return _dompurify2.default.sanitize(str, {
                ADD_ATTR: ["target"]
            })
        }