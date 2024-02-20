function getTableInputValue () {

    var table = document.getElementById( "showTable" ),
        inputs = table.getElementsByTagName( "input" ),
        values = [];

    for ( var i = 0, input; input = inputs[ i ]; i++ ) {
        values.push( input.value | 0 );
    }

    return values;

}