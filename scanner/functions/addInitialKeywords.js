function addInitialKeywords(self) {
        for (var name in self._opts.keywords) {
            var keyword = self._opts.keywords[name];
            self.addKeyword(name, keyword);
        }
    }