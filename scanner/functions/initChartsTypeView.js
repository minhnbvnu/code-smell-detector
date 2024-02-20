function initChartsTypeView () {

    var contents = [];

    for ( var i = 0, len = chartsConfig.length; i<len; i++ ) {

        contents.push( '<div class="view-box" data-chart-type="'+ i +'"><img width="300" src="images/charts'+ i +'.png"></div>' );

    }

    $( "#scrollBed" ).html( contents.join( "" ) );

}