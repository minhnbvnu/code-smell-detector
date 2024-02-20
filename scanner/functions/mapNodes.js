function mapNodes(nodes) {
        return nodes.map(function (r) { return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)]; });
    }