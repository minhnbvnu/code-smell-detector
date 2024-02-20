function formatJSDocLink(link) {
            const kind = link.kind === 327 /* JSDocLink */ ? "link" : link.kind === 328 /* JSDocLinkCode */ ? "linkcode" : "linkplain";
            const name = link.name ? entityNameToString(link.name) : "";
            const space = link.name && link.text.startsWith("://") ? "" : " ";
            return `{@${kind} ${name}${space}${link.text}}`;
        }