function flip_step_mode(mode) {
        switch (mode) {
            case "before":
                return "after";
            case "after":
                return "before";
            case "center":
                return "center";
        }
    }