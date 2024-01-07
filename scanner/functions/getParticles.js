function getParticles() {
        var size = map.getSize();
        return [{
            point : new maptalks.Point(size.width / 2, size.height / 2),
            r : 50,
            color : 'rgba(255, 0, 0, 0.1)'
        }];
    }