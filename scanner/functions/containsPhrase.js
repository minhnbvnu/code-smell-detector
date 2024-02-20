function containsPhrase(row)
    {
        var column,
            searchPattern = new RegExp(that.searchPhrase, (that.options.caseSensitive) ? "g" : "gi");

        for (var i = 0; i < that.columns.length; i++)
        {
            column = that.columns[i];
            if (column.searchable && column.visible &&
                column.converter.to(row[column.id]).search(searchPattern) > -1)
            {
                return true;
            }
        }

        return false;
    }