function Y7(n){let t=n.getAttribute("is");if(t&&q7[t]){let e=n;for(e.removeAttribute("is"),n=e.ownerDocument.createElement(t),e.parentNode.replaceChild(n,e),n.appendChild(e);e.attributes.length;)n.setAttribute(e.attributes[0].name,e.attributes[0].value),e.removeAttribute(e.attributes[0].name)}return n}