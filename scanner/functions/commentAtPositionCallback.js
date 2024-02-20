function commentAtPositionCallback(pos, end, kind, _nl, at) {
        return at >= pos && at < end ? { pos, end, kind } : undefined;
    }