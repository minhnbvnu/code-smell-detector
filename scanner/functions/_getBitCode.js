function _getBitCode(p, bounds) {
    let code = 0;

    if (p.x < bounds.getMin().x) { // left
        code |= 1;
    } else if (p.x > bounds.getMax().x) { // right
        code |= 2;
    }

    if (p.y < bounds.getMin().y) { // bottom
        code |= 4;
    } else if (p.y > bounds.getMax().y) { // top
        code |= 8;
    }

    return code;
}