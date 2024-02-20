function to_overflow(policy) {
                switch (policy) {
                    case "auto": return "auto";
                    case "visible": return "scroll";
                    case "hidden": return "hidden";
                }
            }