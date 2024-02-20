function addUsingInnerHtml(file, container) {
            var content = file.response.content;

            // http://stackoverflow.com/a/475217/319878
            var base64regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

            // We are going to use dangerous innerHTML, so check the data first.
            if (content.text.match(base64regex)) {
                // https://css-tricks.com/data-uris/
                var src = createImageSrc(content);

                container.innerHTML = "<img src=" + src + ">";
            } else {
                // error?
            }
        }