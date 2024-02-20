function span_height(r0, r1) {
                let height = (r1 - r0) * rspacing;
                for (let r = r0; r <= r1; r++) {
                    height += rows[r].height;
                }
                return height;
            }