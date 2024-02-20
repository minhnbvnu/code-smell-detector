function __escape__(value)
        {
            function replaceChars(ch)
            {
                switch (ch)
                {
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "&":
                        return "&amp;";
                    case "'":
                        return "&#39;";
                    case '"':
                        return "&quot;";
                }
                return "?";
            }
            return String(value).replace(/[<>&"']/g, replaceChars);
        }