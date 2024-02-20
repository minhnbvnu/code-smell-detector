function routePage(res, execState, result){
            res.header['Link'] = headers.format('Link', {
                href : 'data:application/json,' + encodeURIComponent(JSON.stringify(execState)),
                rel : ['execstate']
            });
            res.render(__dirname + '/public/views/api/routeInfo.ejs', {
                title: 'ql.io',
                layout: __dirname + '/public/views/api-layout',
                routeInfo: result,
                related:
                    _(result.related).chain()
                        .map(function(route){
                            var parse = new MutableURI(route);
                            return {
                                method: parse.getParam('method'),
                                path: parse.getParam('path'),
                                about: route
                            };
                        })
                        .value(),
                tables:
                    _(result.tables).chain()
                        .map(function(table){
                            var parse = new MutableURI(table);
                            return {
                                name: parse.getParam('name'),
                                about: table
                            };
                        })
                        .value()
            });
        }