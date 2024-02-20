function GetPageCount(recordCount, pageSize) {
        if (recordCount <= 0) return 1;
        if (recordCount % pageSize == 0)
            return parseInt(recordCount / pageSize);
        else
            return parseInt(recordCount / pageSize) + 1;
    }