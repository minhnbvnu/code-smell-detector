function parse_BrtBundleSh(data,length){var z={};z.hsState=data.read_shift(4);z.iTabID=data.read_shift(4);z.strRelID=parse_RelID(data,length-8);z.name=parse_XLWideString(data);return z}