function addPragmaForMatch(pragmas, range, kind, match) {
            if (!match)
                return;
            const name = match[1].toLowerCase();
            const pragma = commentPragmas[name];
            if (!pragma || !(pragma.kind & kind)) {
                return;
            }
            const args = match[2];
            const argument = getNamedPragmaArguments(pragma, args);
            if (argument === "fail")
                return;
            pragmas.push({ name, args: { arguments: argument, range } });
            return;
        }