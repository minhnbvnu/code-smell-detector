function _DoItalicsAndBold(text) {

            // <strong> must go first:
            text = text.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,
            "$1<strong>$3</strong>$4");

            text = text.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,
            "$1<em>$3</em>$4");

            return text;
        }