function escapeRawStringForTemplate(s) {
            return s.replace(/\\.|[$`]/g, (m) => m[0] === "\\" ? m : "\\" + m);
        }