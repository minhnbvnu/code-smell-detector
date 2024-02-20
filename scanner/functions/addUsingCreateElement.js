function addUsingCreateElement(file, container) {
            var responseImage = body.ownerDocument.createElement("img");

            var content = file.response.content;
            responseImage.src = createImageSrc(content);

            container.appendChild(responseImage);
        }