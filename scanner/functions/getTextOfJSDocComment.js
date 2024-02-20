function getTextOfJSDocComment(comment) {
            return typeof comment === "string" ? comment : comment == null ? void 0 : comment.map((c) => c.kind === 324 /* JSDocText */ ? c.text : formatJSDocLink(c)).join("");
        }