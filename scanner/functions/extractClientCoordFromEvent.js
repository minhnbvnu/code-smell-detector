function extractClientCoordFromEvent(pointers, out) {
        out.set(0, 0);
        pointers.forEach(function (pointer) {
            out.x += pointer.clientX;
            out.y += pointer.clientY;
        });
        out.x /= pointers.length;
        out.y /= pointers.length;
    }