function getSyntaxHighlighterScriptTags()
    {
        var tags = document.getElementsByTagName('script'),
            result = []
            ;

        for (var i = 0; i < tags.length; i++)
            if (tags[i].type == 'syntaxhighlighter')
                result.push(tags[i]);

        return result;
    }