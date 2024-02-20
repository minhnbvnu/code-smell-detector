function getEDDLoaderScriptTag() {
        var scripts = document.querySelectorAll('script');

        var loaderTag = Array.prototype.find.call(scripts, function (script) {
            return script.hasAttribute('data-edd-deps');
        });

        if (!loaderTag) {
            throw Error('Can\'t find a eddloader script tag with attribute data-edd-deps')
        }

        return loaderTag;
    }