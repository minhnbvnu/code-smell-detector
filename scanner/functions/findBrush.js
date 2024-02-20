function findBrush(alias, showAlert)
    {
        var brushes = sh.vars.discoveredBrushes,
            result = null
            ;

        if (brushes == null)
        {
            brushes = {};

            // Find all brushes
            for (var brush in sh.brushes)
            {
                var info = sh.brushes[brush],
                    aliases = info.aliases
                    ;

                if (aliases == null)
                    continue;

                // keep the brush name
                info.brushName = brush.toLowerCase();

                for (var i = 0; i < aliases.length; i++)
                    brushes[aliases[i]] = brush;
            }

            sh.vars.discoveredBrushes = brushes;
        }

        result = sh.brushes[brushes[alias]];

        if (result == null && showAlert)
            alert(sh.config.strings.noBrush + alias);

        return result;
    }