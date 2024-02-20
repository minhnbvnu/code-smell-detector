function setRNG(gen)
    {
        if (!gen.hasOwnProperty('randomUInt31') ||
            !gen.hasOwnProperty('setRandSeed'))
        {
            throw TypeError('RNG does not implement the required API');
        }

        rng = gen;
    }