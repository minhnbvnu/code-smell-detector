function replaceHarViewerDemoUrl(html) {
                var thisHarViewerUrl = window.location.href.split("?")[0];
                return replace(html, "@HARVIEWER_DEMO_URL@", thisHarViewerUrl);
            }