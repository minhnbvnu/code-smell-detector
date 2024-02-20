function quote_template() {
                    return "`" + str.replace(/`/g, "\\`") + "`";
                }