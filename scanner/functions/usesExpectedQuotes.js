function usesExpectedQuotes(node) {
                return node.value.includes(setting.quote) || astUtils.isSurroundedBy(node.raw, setting.quote);
            }