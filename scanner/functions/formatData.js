function formatData ( tableNode ) {

        var meta = tableNode.getAttribute( "data-chart" ),
            metaConfig = {},
            data = [];

        //提取table数据
        for ( var i = 0, row; row = tableNode.rows[ i ]; i++ ) {

            var rowData = [];

            for ( var j = 0, cell; cell = row.cells[ j ]; j++ ) {

                var value = ( cell.innerText || cell.textContent || '' );
                rowData.push( cell.tagName == 'TH' ? value:(value | 0) );

            }

            data.push( rowData );

        }

        //解析元信息
        meta = meta.split( ";" );
        for ( var i = 0, metaData; metaData = meta[ i ]; i++ ) {

            metaData = metaData.split( ":" );
            metaConfig[ metaData[ 0 ] ] = metaData[ 1 ];

        }


        return {
            table: tableNode,
            meta: metaConfig,
            data: data
        };

    }