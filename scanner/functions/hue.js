function hue(h) {
                    h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
                    if (h * 6 < 1) {
                        return m1_1 + (m2_1 - m1_1) * h * 6;
                    }
                    else if (h * 2 < 1) {
                        return m2_1;
                    }
                    else if (h * 3 < 2) {
                        return m1_1 + (m2_1 - m1_1) * (2 / 3 - h) * 6;
                    }
                    else {
                        return m1_1;
                    }
                }