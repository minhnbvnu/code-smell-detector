function css_sizing(policy, size, auto_size, margin) {
                switch (policy) {
                    case "auto":
                        return size != null ? (0, dom_1.px)(size) : auto_size;
                    case "fixed":
                        return size != null ? (0, dom_1.px)(size) : "fit-content";
                    case "fit":
                        return "fit-content";
                    case "min":
                        return "min-content";
                    case "max":
                        return margin == null ? "100%" : `calc(100% - ${margin})`;
                }
            }