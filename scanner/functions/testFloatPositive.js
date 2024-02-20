function testFloatPositive(val)
    {
        return /^([0-9]+|[0-9]+\.|\.[0-9]+|[0-9]+\.[0-9]+)$/.test(val);
    }