function marker_type_to_size_hint(marker_type) {
        // Marker size hint is only used here and in the marker fragment shader.
        switch (marker_type) {
            case "dash":
                return 1;
            case "dot":
                return 2;
            case "diamond":
            case "diamond_cross":
            case "diamond_dot":
                return 3;
            case "hex":
            case "hex_tile":
                return 4;
            case "square_pin":
                return 5;
            case "inverted_triangle":
            case "triangle":
            case "triangle_dot":
                return 6;
            case "triangle_pin":
                return 7;
            case "star":
            case "star_dot":
                return 8;
            default:
                return 0;
        }
    }