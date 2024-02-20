function initUserConfig ( config ) {

    var parsedConfig = {};

    if ( !config ) {
        return;
    }

    config = config.split( ";" );

    $.each( config, function ( index, item ) {

        item = item.split( ":" );
        parsedConfig[ item[ 0 ] ] = item[ 1 ];

    } );

    setUserConfig( parsedConfig );

}