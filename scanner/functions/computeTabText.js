function computeTabText() {
            for (var str = '<span class="cm-tab">', i = 0; i < options.tabSize; ++i) str += " ";
            return str + "</span>";
        }