function parse_Country(blob,length){var o=[],d;d=blob.read_shift(2);o[0]=CountryEnum[d]||d;d=blob.read_shift(2);o[1]=CountryEnum[d]||d;return o}