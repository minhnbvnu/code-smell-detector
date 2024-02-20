function escapeSnippetText(text) {
            return text.replace(/\$/gm, () => "\\$");
        }