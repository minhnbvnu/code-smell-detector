function _get_active_attr(et) {
                switch (et) {
                    case "tap": return "active_tap";
                    case "pan": return "active_drag";
                    case "pinch":
                    case "scroll": return "active_scroll";
                    case "multi": return "active_multi";
                    default: return null;
                }
            }