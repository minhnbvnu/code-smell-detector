function matchesSortCallback(m1, m2)
    {
        // sort matches by index first
        if(m1.index < m2.index)
            return -1;
        else if(m1.index > m2.index)
            return 1;
        else
        {
            // if index is the same, sort by length
            if(m1.length < m2.length)
                return -1;
            else if(m1.length > m2.length)
                return 1;
        }

        return 0;
    }