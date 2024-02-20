function getMaxVolume(analyser, fftBins) {
                    var maxVolume = -Infinity;
                    analyser.getFloatFrequencyData(fftBins);

                    for (var i = 0, ii = fftBins.length; i < ii; i++) {
                        if (fftBins[i] > maxVolume && fftBins[i] < 0) {
                            maxVolume = fftBins[i];
                        }
                    };

                    return maxVolume;
                }