function readFeatureField(tag, feature, pbf) {
    if (tag === 1) feature.geometry = readGeometry(pbf, {});

    else if (tag === 11) feature.id = pbf.readString();
    else if (tag === 12) feature.id = pbf.readSVarint();

    else if (tag === 13) values.push(readValue(pbf));
    else if (tag === 14) feature.properties = readProps(pbf, {});
    else if (tag === 15) readProps(pbf, feature);
}