function load_map(err) {
        if (err) {
            self.done(err);
        }

        if (!stack_mapper) {
            return self.start();
        }

        var map_path = '/__zuul/test-bundle.map.json';
        ajax.get(map_path).end(function(err, res) {
            if (err) {
                // ignore map load error
                return self.start();
            }

            self._source_map = res.body;
            try {
                self._mapper = stack_mapper(res.body);
            } catch (err) {}

            self.start();
        });
    }