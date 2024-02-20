function formatExtensions(extensions) {
            const result = [];
            if (extensions & 1 /* TypeScript */)
                result.push("TypeScript");
            if (extensions & 2 /* JavaScript */)
                result.push("JavaScript");
            if (extensions & 4 /* Declaration */)
                result.push("Declaration");
            if (extensions & 8 /* Json */)
                result.push("JSON");
            return result.join(", ");
        }