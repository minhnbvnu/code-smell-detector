function updateConfigItem ( value ) {

    var table = $( "#showTable" )[ 0 ],
        isDisable = value === 'disable' ? true : false;

    //table中的input处理
    for ( var i = 2 , row; row = table.rows[ i ]; i++ ) {

        for ( var j = 1, cell; cell = row.cells[ j ]; j++ ) {

            $( "input", cell ).attr( "disabled", isDisable );

        }

    }

    //其他项处理
    $( "input.not-pie-item" ).attr( "disabled", isDisable );
    $( "#tipInput" ).attr( "disabled", !isDisable )

}