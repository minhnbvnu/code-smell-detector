function roundtripTest(geojson) {
    return function (t) {
        var buf = geobuf.encode(geojson, new Pbf());
        var geojson2 = geobuf.decode(new Pbf(buf));
        t.same(geojson2, geojson);
        t.end();
    };
}