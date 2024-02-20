function sortRows()
{
    var sortArray = [];

    function sort(x, y, current)
    {
        current = current || 0;
        var next = current + 1,
            item = sortArray[current];

        function sortOrder(value)
        {
            return (item.order === "asc") ? value : value * -1;
        }

        return (x[item.id] > y[item.id]) ? sortOrder(1) :
            (x[item.id] < y[item.id]) ? sortOrder(-1) :
                (sortArray.length > next) ? sort(x, y, next) : 0;
    }

    if (!this.options.ajax)
    {
        var that = this;

        for (var key in this.sortDictionary)
        {
            if (this.options.multiSort || sortArray.length === 0)
            {
                sortArray.push({
                    id: key,
                    order: this.sortDictionary[key]
                });
            }
        }

        if (sortArray.length > 0)
        {
            this.rows.sort(sort);
        }
    }
}