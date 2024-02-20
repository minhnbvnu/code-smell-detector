function ellipsis_field( data, cutoff, wordbreak ) {

    data = data.toString();
    let anchor = $('<div>');

    if ( data.length <= cutoff ) {
        anchor.text(data);
        return anchor.prop('outerHTML');
    }

    let shortened = data.substr(0, cutoff-1);

    // Find the last white space character in the string
    if ( wordbreak ) {
        shortened = shortened.replace(/\s([^\s]*)$/, '');
    }

    // Build a new anchor tag with the new target
    anchor.text(shortened + '…');
    anchor.className = 'ellipsis';
    anchor.title = data;

    return anchor.prop('outerHTML');
}