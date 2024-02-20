function setText(newText, start2, length3) {
                text = newText || "";
                end = length3 === void 0 ? text.length : start2 + length3;
                setTextPos(start2 || 0);
            }