function decodeUtf16(lead, trail) {
            return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
        }