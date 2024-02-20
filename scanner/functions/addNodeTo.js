function addNodeTo(addTarget, className) {
                var div = scope_Document.createElement("div");
                if (className) {
                    addClass(div, className);
                }
                addTarget.appendChild(div);
                return div;
            }