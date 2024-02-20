function verbatim(stream, state) {
        if (!verbatimMode) {
            return block(stream, state, 'meta');
        } else {
            if (stream.sol()) {
                if (!stream.eatSpace()) {
                    setNormal(state, stream);
                }

                return null;
            }

            return verbatimMode.token(stream, state.ctx.local);
        }
    }