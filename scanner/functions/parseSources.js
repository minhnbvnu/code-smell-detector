function parseSources () {

        if ( !containers ) {
            return null;
        }

        return extractChartData( containers );

    }