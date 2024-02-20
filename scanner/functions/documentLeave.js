function documentLeave(event, data) {
                if (event.type === "mouseout" &&
                    event.target.nodeName === "HTML" &&
                    event.relatedTarget === null) {
                    eventEnd(event, data);
                }
            }