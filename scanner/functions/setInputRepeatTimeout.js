function setInputRepeatTimeout() {
            // Set the repetition timer as needed
            if (!isNaN(node.repeat) && node.repeat > 0) {
                node.interval_id = setTimeout( function() {
                    node.emit("input",{});
                }, node.repeat );
            }
            ss = false;
        }