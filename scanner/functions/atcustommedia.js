function atcustommedia() {
            var pos = position();
            var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (!m)
                return;
            return pos({
                type: 'custom-media',
                name: trim(m[1]),
                media: trim(m[2])
            });
        }