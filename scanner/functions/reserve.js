function reserve(buf, pos, count) {
            if (buf.length > pos + count)
                return buf;
            const swap = new Uint8Array(buf.length * 2);
            swap.set(buf);
            return swap;
        }