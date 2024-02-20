function doXhr(statement, escaped, compiled) {
        var mediaType, link, execState, data, x, i, status, event

        emitter = new EventEmitter();
        wireup(emitter);
        var url = '/q?s=' + escaped;
        url = subscribe(undefined, url);
        x = $.ajax({
            type: 'GET',
            processData: false,
            url: url,
            success: function(data) {
                data = x.responseText;
                mediaType = x.getResponseHeader('content-type');
                link = x.getResponseHeader('Link');
                if(link) {
                    link = headers.parse('Link', link);
                    execState = link.href;
                    if(execState.indexOf('data:application/json,') === 0) {
                        execState = execState.substring('data:application/json,'.length);
                        execState = decodeURIComponent(execState);
                        execState = JSON.parse(execState);
                        try {
                            for(i = 0; i < execState.length; i++) {
                                event = execState[i];
                                emitter.emit(event.type, event);
                            }
                        }
                        catch(e) {
                            alert(e);
                        }
                    }
                }
                if(mediaType === 'application/json') {
                    data = JSON.parse(data);
                    $('#results').attr('class', 'results tree json').html(formatter.jsonToHTML(data));
                    $('#results').treeview();
                }
                else if(mediaType === 'text/html') {
                    $('#results').attr('class', 'results html').html(data);
                }
                else {
                    $('#results').attr('class', 'results code json').text(data);
                }
                $('#results').animate({
                    opacity: 1.0
                });
            },
            error: function(req) {
                mediaType = x.getResponseHeader('content-type');
                if(mediaType == 'application/json') {
                    data = JSON.parse(req.responseText);
                    $('#results').attr('class', 'results tree json').html(formatter.jsonToHTML(data));
                    $('#results').treeview();
                }
                else if(mediaType === 'text/html') {
                    $('#results').attr('class', 'results').html(data);
                }
                else {
                    $('#results').attr('class', 'results code json').text(data);
                }
                $('#results').animate({
                    opacity: 1.0
                });
            }
        });
        markers.push(editor.setMarker(compiled[0].line - 1, '&#9992', 'red'));
    }