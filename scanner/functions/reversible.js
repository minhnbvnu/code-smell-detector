function reversible() {
                return self.left.is_constant()
                    || self.right.is_constant()
                    || !self.left.has_side_effects(compressor)
                        && !self.right.has_side_effects(compressor);
            }