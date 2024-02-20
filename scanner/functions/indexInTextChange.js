function indexInTextChange(change, name) {
            if (startsWith(change, name))
                return 0;
            let idx = change.indexOf(" " + name);
            if (idx === -1)
                idx = change.indexOf("." + name);
            if (idx === -1)
                idx = change.indexOf('"' + name);
            return idx === -1 ? -1 : idx + 1;
        }