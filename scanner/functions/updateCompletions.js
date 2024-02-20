function updateCompletions() {
        if (options.getCompletions) {
            var prefix;
            if (options.getPrefix) {
                prefix = options.getPrefix(cmdLine);
            }

            var completions = options.getCompletions(cmdLine);
            popup.setData(completions, prefix);
            popup.resize(true);
        }
    }