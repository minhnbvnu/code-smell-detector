function unescapeLeadingUnderscores(identifier) {
            const id = identifier;
            return id.length >= 3 && id.charCodeAt(0) === 95 /* _ */ && id.charCodeAt(1) === 95 /* _ */ && id.charCodeAt(2) === 95 /* _ */ ? id.substr(1) : id;
        }