function pushCell()
        {
            curRow.push(curCell);
            curCell = '';

            state = 'PRE-QUOTE';
        }