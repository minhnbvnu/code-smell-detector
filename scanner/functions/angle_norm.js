function angle_norm(angle) {
        if (angle == 0) {
            return 0;
        }
        while (angle <= 0) {
            angle += 2 * PI;
        }
        while (angle > 2 * PI) {
            angle -= 2 * PI;
        }
        return angle;
    }