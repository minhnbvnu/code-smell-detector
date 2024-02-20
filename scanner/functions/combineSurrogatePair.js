function combineSurrogatePair(lead, trail) {
        return (lead - 0xd800) * 0x400 + (trail - 0xdc00) + 0x10000;
    }