function isWordDocument( str ) {
        return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test( str );
    }