function genDfaTable(start) {
        var i,
            j,
            states = {},
            nodes = [],
            stack = [start],
            symbols = [],
            top,
            html = '';
        while (stack.length > 0) {
            top = stack.pop();
            if (!states.hasOwnProperty(top.id)) {
                states[top.id] = top;
                top.nature = toNature(top.id);
                nodes.push(top);
                for (i = 0; i < top.edges.length; i += 1) {
                    if (top.edges[i][0] !== 'ϵ' && symbols.indexOf(top.edges[i][0]) < 0) {
                        symbols.push(top.edges[i][0]);
                    }
                    stack.push(top.edges[i][1]);
                }
            }
        }
        nodes.sort(function (a, b) {
            return a.nature - b.nature;
        });
        symbols.sort();
        html += '<table class="table">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>NFA STATE</th>';
        html += '<th>DFA STATE</th>';
        html += '<th>TYPE</th>';
        for (i = 0; i < symbols.length; i += 1) {
            html += '<th>' + symbols[i] + '</th>';
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (i = 0; i < nodes.length; i += 1) {
            html += '<tr>';
            html += '<td>{' + nodes[i].key + '}</td>';
            html += '<td>' + nodes[i].id + '</td>';
            html += '<td>' + nodes[i].type + '</td>';
            for (j = 0; j < symbols.length; j += 1) {
                html += '<td>';
                if (nodes[i].trans.hasOwnProperty(symbols[j])) {
                    html += nodes[i].trans[symbols[j]].id;
                }
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        return html;
    }