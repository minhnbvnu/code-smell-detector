function findInList(list, tuple)
        {
            for (let idx = 0; idx < list.length; ++idx)
            {
                if (treeEq(list[idx], tuple))
                    return idx;
            }

            return -1;
        }