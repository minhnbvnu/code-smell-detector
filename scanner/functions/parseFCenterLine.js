function parseFCenterLine(parser, name) {
        var dollar = parser.GetNext();
        if (dollar !== '$') {
            throw new TexError_js_1.default('IllegalUseOfCommand', 'Use of %1 does not match it\'s definition.', name);
        }
        parser.i++;
        var axiom = parser.GetUpTo(name, '$');
        if (axiom.indexOf('\\fCenter') === -1) {
            throw new TexError_js_1.default('IllegalUseOfCommand', 'Missing \\fCenter in %1.', name);
        }
        var _a = __read(axiom.split('\\fCenter'), 2), prem = _a[0], conc = _a[1];
        var premise = (new TexParser_js_1.default(prem, parser.stack.env, parser.configuration)).mml();
        var conclusion = (new TexParser_js_1.default(conc, parser.stack.env, parser.configuration)).mml();
        var fcenter = (new TexParser_js_1.default('\\fCenter', parser.stack.env, parser.configuration)).mml();
        var left = parser.create('node', 'mtd', [premise], {});
        var middle = parser.create('node', 'mtd', [fcenter], {});
        var right = parser.create('node', 'mtd', [conclusion], {});
        var row = parser.create('node', 'mtr', [left, middle, right], {});
        var table = parser.create('node', 'mtable', [row], { columnspacing: '.5ex', columnalign: 'center 2' });
        BussproofsUtil.setProperty(table, 'sequent', true);
        parser.configuration.addNode('sequent', row);
        return table;
    }