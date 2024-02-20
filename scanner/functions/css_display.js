function css_display(display) {
                // Convert to legacy values due to limitted browser support.
                const { inner, outer } = display;
                switch (`${inner} ${outer}`) {
                    case "block flow": return "block";
                    case "inline flow": return "inline";
                    case "block flow-root": return "flow-root";
                    case "inline flow-root": return "inline-block";
                    case "block flex": return "flex";
                    case "inline flex": return "inline-flex";
                    case "block grid": return "grid";
                    case "inline grid": return "inline-grid";
                    case "block table": return "table";
                    case "inline table": return "inline-table";
                    default: (0, assert_1.unreachable)();
                }
            }