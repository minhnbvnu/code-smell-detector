function getReplacedText(styleType, text) {
                switch (styleType) {
                    case "between":
                        return `,${text.replace(astUtils.LINEBREAK_MATCHER, "")}`;
                    case "first":
                        return `${text},`;
                    case "last":
                        return `,${text}`;
                    default:
                        return "";
                }
            }