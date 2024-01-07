function getResizeAnchors() {
            if (isMarker) {
                const ext = geometry.getContainerExtent();
                return [
                    // ext.getMin(),
                    new Point(ext['xmin'], ext['ymin']),
                    new Point((ext['xmax'] + ext['xmin']) / 2, ext['ymin']),
                    new Point(ext['xmax'], ext['ymin']),
                    new Point(ext['xmin'], (ext['ymin'] + ext['ymax']) / 2),
                    new Point(ext['xmax'], (ext['ymin'] + ext['ymax']) / 2),
                    new Point(ext['xmin'], ext['ymax']),
                    new Point((ext['xmax'] + ext['xmin']) / 2, ext['ymax']),
                    new Point(ext['xmax'], ext['ymax'])
                ];
            }
            const ext = geometry._getPrjExtent();
            return [
                // ext.getMin(),
                new Point(ext['xmin'], ext['ymax']),
                new Point((ext['xmax'] + ext['xmin']) / 2, ext['ymax']),
                new Point(ext['xmax'], ext['ymax']),
                new Point(ext['xmin'], (ext['ymax'] + ext['ymin']) / 2),
                new Point(ext['xmax'], (ext['ymax'] + ext['ymin']) / 2),
                new Point(ext['xmin'], ext['ymin']),
                new Point((ext['xmax'] + ext['xmin']) / 2, ext['ymin']),
                new Point(ext['xmax'], ext['ymin']),
            ];
        }