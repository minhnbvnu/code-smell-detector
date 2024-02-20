function wireup(emitter) {
        var i, contentLength;
        emitter.on('statement-error', function (data) {
            markers.push(editor.setMarker(data.line - 1, data.elapsed + ' ms', 'red'));
        });
        emitter.on('statement-in-flight', function (data) {
            markers.push(editor.setMarker(data.line - 1, '&#9992', 'in-progress'));
        });
        emitter.on('statement-request', function (data) {
            var key = data.line + '';
            var entry = {
                line: key,
                id: data.id,
                startedDateTime: data.start,
                request: {
                    method: data.method,
                    url: data.uri,
                    headers: data.headers,
                    postData: {
                        text: data.body
                    }
                }
            };
            har.entry(data.id, entry);
        });
        emitter.on('statement-response', function (data) {
            contentLength = data.body.length; // This is post text decoding - hence not accurate.
            for(i = 0; i < data.headers.length; i++) {
                if(data.headers[i].name === 'content-length') {
                    contentLength = parseInt(data.headers[i].value);
                    break;
                }
            }
            har.response(data.id, {
                status: data.status,
                statusText: data.statusText,
                headers: data.headers,
                bodySize: contentLength,
                content: {
                    text: data.body
                }
            });
            har.timings(data.id, data.timings);
        });
        emitter.on('statement-success', function (data) {
            if (emitterID) {
                markers.push(editor.setMarker(data.line - 1, '&#8226', 'green'));
            }
            else {
                markers.push(editor.setMarker(data.line - 1, data.elapsed + ' ms', 'green'));
            }
        });
        emitter.on('ql.io-debug', function (data) {
            emitterID = data.emitterID;
            var context = data.context;
            context._step = step++;
            $('#results').attr('class', 'results tree json').html(formatter.jsonToHTML(context));
            $('#results').treeview();
            $('#results').animate({
                opacity: 1.0
            });
        });
        emitter.on('ql.io-visualization', function(data){
            $('#dependencyMap').attr('src', data);
            $('#dependencyMap').show();
        })
        emitter.on('script-done', function (data) {
            markers.push(editor.setMarker(data.line - 1, data.elapsed + ' ms', 'green'));
            delPic();
            $('#step').hide();
        });
    }