function reloadData(from, to) {
            for (var i = from; i <= to; i++)
                delete data[i];
            ensureData(from, to);
        }