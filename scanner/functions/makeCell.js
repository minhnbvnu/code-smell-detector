function makeCell(i, j)
        {
            var cellOn = grid[i][j];

            // The outer cell div is the element reacting to clicks
            // It's larger and therefore easier to click
            var cell = document.createElement('div');
            cell.style['display'] = 'inline-block';
            cell.title = rowNames[j];

            // 4-step beat separator
            if (i % 4 == 0)
            {
                var sep = document.createElement('div');
                sep.style['display'] = 'inline-block';
                sep.style['width'] = '1px';
                cell.appendChild(sep);
            }

            // The inner div is the colored/highlighted element
            var inner = document.createElement('div');
            inner.className = cellOn? 'cell_on':'cell_off';
            cell.appendChild(inner);

            // 4-step beat separator
            if (i % 4 == 3)
            {
                var sep = document.createElement('div');
                sep.style['display'] = 'inline-block';
                sep.style['width'] = '1px';
                cell.appendChild(sep);
            }

            cell.onpointerdown = (evt) => evt.stopPropagation();
            cell.onpointerup = (evt) => evt.stopPropagation();

            cell.onclick = (evt) =>
            {
                console.log('clicked ' + i + ', ' + j);
                this.send(new model.ToggleCell(
                    this.nodeId,
                    patIdx,
                    i,
                    j
                ));

                evt.stopPropagation();
            };

            if (!(i in cellDivs))
                cellDivs[i] = [];

            cellDivs[i][j] = inner;

            return cell;
        }