function read_source_map(code) {
            var match = /(?:^|[^.])\/\/# sourceMappingURL=data:application\/json(;[\w=-]*)?;base64,([+/0-9A-Za-z]*=*)\s*$/.exec(code);
            if (!match) {
                console.warn("inline source map not found");
                return null;
            }
            return to_ascii(match[2]);
        }