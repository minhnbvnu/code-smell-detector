function calculateCapacity(x)
    {
        if (x >= 1 << 30)
            return 1 << 30;
        if (x == 0)
            return 16;
        x = x - 1;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        return x + 1;
    }