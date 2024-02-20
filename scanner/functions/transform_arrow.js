function transform_arrow(self, tw) {
        self.argnames = do_list(self.argnames, tw);
        if (self.rest) self.rest = self.rest.transform(tw);
        if (self.value) {
            self.value = self.value.transform(tw);
        } else {
            self.body = do_list(self.body, tw);
        }
    }