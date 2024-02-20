function hasASIProblem(token) {
                return token && token.type === "Punctuator" && /^[([/`+-]/u.test(token.value);
            }