function atkeyframes() {
            var pos = position();
            var m = match(/^@([-\w]+)?keyframes\s*/);
            if (!m)
                return;
            var vendor = m[1];
            // identifier
            var m = match(/^([-\w]+)\s*/);
            if (!m)
                return error("@keyframes missing name");
            var name = m[1];
            if (!open())
                return error("@keyframes missing '{'");
            var frame;
            var frames = comments();
            while (frame = keyframe()) {
                frames.push(frame);
                frames = frames.concat(comments());
            }
            if (!close())
                return error("@keyframes missing '}'");
            return pos({
                type: 'keyframes',
                name: name,
                vendor: vendor,
                keyframes: frames
            });
        }