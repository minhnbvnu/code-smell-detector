function _wireY(args, offset) {
    return args.rect.center().y + (offset - args.gate.height/2 + 0.5) * Config.WIRE_SPACING;
}