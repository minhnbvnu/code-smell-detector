function runScripts(node) {
        Array.from(node.querySelectorAll("script")).forEach((oldScript) => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes)
                .forEach((attr) => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            if (oldScript.parentNode)
                oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }