function span_width(c0, c1) {
                let width = (c1 - c0) * cspacing;
                for (let c = c0; c <= c1; c++) {
                    width += cols[c].width;
                }
                return width;
            }