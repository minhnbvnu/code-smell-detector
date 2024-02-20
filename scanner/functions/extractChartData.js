function extractChartData ( rootNode ) {

        var data = [],
            tables = rootNode.getElementsByTagName( "table" );

        for ( var i = 0, tableNode; tableNode = tables[ i ]; i++ ) {

            if ( tableNode.getAttribute( "data-chart" ) !== null ) {

                data.push( formatData( tableNode ) );

            }

        }

        return data.length ? data : null;

    }