function median(numList)
    {
        function compareFn(a, b)
        {
            if (a < b)
                return -1;
            else if (b > a)
                return 1;
            return 0;
        }

        let sortedNums = [...numList].sort(compareFn);
        return sortedNums[Math.floor(sortedNums.length/2)];
    }