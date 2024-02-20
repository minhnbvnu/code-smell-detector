function instantiateColorFormatters(tFormats){
                    var t, colorFormat, i, data, formatType = 'color';
                    for (t = 0; t < tFormats[formatType].length; t++) {
                        colorFormat = new $google.visualization.ColorFormat();

                        for (i = 0; i < tFormats[formatType][t].formats.length; i++) {
                            data = tFormats[formatType][t].formats[i];

                            if (typeof (data.fromBgColor) !== 'undefined' && typeof (data.toBgColor) !== 'undefined') {
                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                            } else {
                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                            }
                        }

                        self.iFormats[formatType].push(colorFormat);
                    }
                }