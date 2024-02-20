function scn(tagName, className, child) {
        var result = document.createElement(tagName),
            i, len;

        result.className = className;

        if (isArray(child)) {
            for (i = 0, len = child.length; i < len; i += 1) {
                result.appendChild(child[i]);
            }
        } else {
            result.appendChild(child);
        }

        return result;
    }