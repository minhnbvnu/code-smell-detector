function body_loaded() {

    collaborator = new Collaborator( get_caseid() ) ;

    // registering change callback
    from_sync = true;
    editor.on( "change", function( e ) {
        // TODO, we could make things more efficient and not likely to conflict by keeping track of change IDs
        if( last_applied_change!=e && editor.curOp && editor.curOp.command.name) {
            collaborator.change( JSON.stringify(e) ) ;
        }
    }, false );

    editor.$blockScrolling = Infinity ;

    document.getElementsByTagName('textarea')[0].focus() ;
    last_applied_change = null ;
    just_cleared_buffer = false ;
}