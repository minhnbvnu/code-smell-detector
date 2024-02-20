function parse_sizing(tracks, template) {
                if (tracks instanceof Map) {
                    for (const [i, spec] of tracks.entries()) {
                        if ((0, types_1.isString)(spec))
                            template[i].size = spec;
                        else
                            template[i] = spec;
                    }
                }
                else if ((0, types_1.isArray)(tracks)) {
                    for (const [spec, i] of (0, iterator_1.enumerate)(tracks)) {
                        if ((0, types_1.isString)(spec))
                            template[i].size = spec;
                        else
                            template[i] = spec;
                    }
                }
                else if (tracks != null) {
                    for (const row of template) {
                        if ((0, types_1.isString)(tracks))
                            row.size = tracks;
                        else {
                            row.size = tracks.size;
                            row.align = tracks.align;
                        }
                    }
                }
            }