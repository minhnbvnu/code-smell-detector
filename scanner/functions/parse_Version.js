function parse_Version(blob,length){var o={};o.Major=blob.read_shift(2);o.Minor=blob.read_shift(2);return o}