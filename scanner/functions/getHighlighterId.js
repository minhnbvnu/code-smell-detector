function getHighlighterId(id)
    {
        var prefix = 'highlighter_';
        return id.indexOf(prefix) == 0 ? id : prefix + id;
    }