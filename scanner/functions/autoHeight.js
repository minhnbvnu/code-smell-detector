function autoHeight( index ) {
    var iframe = dialog.getDom( "iframe" ),
            parent = iframe.parentNode.parentNode;
    switch ( index ) {
        case 0:
            iframe.style.height = "380px";
            parent.style.height = "392px";
            break;
        case 1:
            iframe.style.height = "220px";
            parent.style.height = "232px";
            break;
        case 2:
            iframe.style.height = "260px";
            parent.style.height = "272px";
            break;
        case 3:
            iframe.style.height = "300px";
            parent.style.height = "312px";
            break;
        case 4:
            iframe.style.height = "140px";
            parent.style.height = "152px";
            break;
        case 5:
            iframe.style.height = "260px";
            parent.style.height = "272px";
            break;
        case 6:
            iframe.style.height = "230px";
            parent.style.height = "242px";
            break;
        default:

    }
}