function makeBar(barIdx, barLen)
        {
            var bar = document.createElement('div');
            bar.style['display'] = 'inline-block';
            bar.style['margin'] = '0px 2px';

            for (var j = 0; j < numRows; ++j)
            {
                var row = document.createElement('div');

                for (var i = 0; i < barLen; ++i)
                {
                    var stepIdx = barIdx * 16 + i;
                    var cell = makeCell.call(this, stepIdx, numRows - j - 1);
                    row.appendChild(cell);
                }

                bar.appendChild(row);
            }

            return bar;
        }