function _getIERange( sel ) {
        var ieRange;
        //ie下有可能报错
        try {
            ieRange = sel.getNative().createRange();
        } catch ( e ) {
            return null;
        }
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
        return null;
    }