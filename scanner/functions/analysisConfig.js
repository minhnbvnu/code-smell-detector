function analysisConfig ( config ) {

        var series = [],
        //数据类别
            categories = [],
            result = [],
            data = config.data,
            meta = config.meta;

        //数据对齐方式为相反的方式， 需要反转数据
        if ( meta.dataFormat != "1" ) {

            for ( var i = 0, len = data.length; i < len ; i++ ) {

                for ( var j = 0, jlen = data[ i ].length; j < jlen; j++ ) {

                    if ( !result[ j ] ) {
                        result[ j ] = [];
                    }

                    result[ j ][ i ] = data[ i ][ j ];

                }

            }

            data = result;

        }

        result = {};

        //普通图表
        if ( meta.chartType != typeConfig.length - 1 ) {

            categories = data[ 0 ].slice( 1 );

            for ( var i = 1, curData; curData = data[ i ]; i++ ) {
                series.push( {
                    name: curData[ 0 ],
                    data: curData.slice( 1 )
                } );
            }

            result.series = series;
            result.categories = categories;
            result.title = meta.title;
            result.subTitle = meta.subTitle;
            result.xTitle = meta.xTitle;
            result.yTitle = meta.yTitle;
            result.suffix = meta.suffix;

        } else {

            var curData = [];

            for ( var i = 1, len = data[ 0 ].length; i < len; i++ ) {

                curData.push( [ data[ 0 ][ i ], data[ 1 ][ i ] | 0 ] );

            }

            //饼图
            series[ 0 ] = {
                type: 'pie',
                name: meta.tip,
                data: curData
            };

            result.series = series;
            result.title = meta.title;
            result.suffix = meta.suffix;

        }

        return result;

    }