function angle_between(mid, lhs, rhs, anticlock = false) {
        const d = angle_dist(lhs, rhs);
        if (d == 0)
            return false;
        if (d == 2 * PI)
            return true;
        const norm_mid = angle_norm(mid);
        const cond = angle_dist(lhs, norm_mid) <= d && angle_dist(norm_mid, rhs) <= d;
        return !anticlock ? cond : !cond;
    }