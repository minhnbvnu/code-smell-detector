function removeSubstring(str, substr) {
            return str.replace(new RegExp(substr, "g"), "")
        }