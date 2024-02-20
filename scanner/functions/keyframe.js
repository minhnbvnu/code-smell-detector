function keyframe() {
            var m;
            var vals = [];
            var pos = position();
            while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
                vals.push(m[1]);
                match(/^,\s*/);
            }
            if (!vals.length)
                return;
            return pos({
                type: 'keyframe',
                values: vals,
                declarations: declarations()
            });
        }