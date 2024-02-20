function onBefore( e, opts, outgoing, incoming, forward ) {
    var h = $(incoming).outerHeight();
    opts.container.animate( { height: h }, opts.autoHeightSpeed, opts.autoHeightEasing );
}