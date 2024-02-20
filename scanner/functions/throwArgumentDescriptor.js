function throwArgumentDescriptor() {
                    throw { type: 'Argument',
                        message: 'svg-gradient expects direction, start_color [start_position], [color position,]...,' +
                            ' end_color [end_position] or direction, color list' };
                }