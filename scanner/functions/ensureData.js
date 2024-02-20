function ensureData(from, to) {
            if (req) {
                req.abort();
                for (var i = req.fromPage; i <= req.toPage; i++)
                    data[i * PAGESIZE] = undefined;
            }
            if (from < 0) {
                from = 0;
            }
            if (data.length > 0) {
                to = Math.min(to, data.length - 1);
            }
            var fromPage = Math.floor(from / PAGESIZE);
            var toPage = Math.floor(to / PAGESIZE);
            while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
                fromPage++;
            while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
                toPage--;
            if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
                // TODO:  look-ahead
                onDataLoaded.notify({ from: from, to: to });
                return;
            }
            var url = "http://octopart.com/api/v3/parts/search?apikey=68b25f31&include[]=short_description&show[]=uid&show[]=manufacturer&show[]=mpn&show[]=brand&show[]=octopart_url&show[]=short_description&q=" + searchstr + "&start=" + (fromPage * PAGESIZE) + "&limit=" + (((toPage - fromPage) * PAGESIZE) + PAGESIZE);
            if (sortcol != null) {
                url += ("&sortby=" + sortcol + ((sortdir > 0) ? "+asc" : "+desc"));
            }
            if (h_request != null) {
                clearTimeout(h_request);
            }
            h_request = setTimeout(function () {
                for (var i = fromPage; i <= toPage; i++)
                    data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'
                onDataLoading.notify({ from: from, to: to });
                req = $.jsonp({
                    url: url,
                    callbackParameter: "callback",
                    cache: true,
                    success: onSuccess,
                    error: function () {
                        onError(fromPage, toPage);
                    }
                });
                req.fromPage = fromPage;
                req.toPage = toPage;
            }, 50);
        }