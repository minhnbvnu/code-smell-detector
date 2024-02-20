function getBrushNameCss(match)
            {
                var result = match ? (match.brushName || brushName) : brushName;
                return result ? result + ' ' : '';
            }