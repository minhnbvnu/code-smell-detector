function capitalized(s) {
    return s.replaceAll(/(^|[ 0-9.,#$%\^&*!\?@;:`~+=\-'"<>\]\[()/\\|_\n])./g, function (x) { return x.toUpperCase(); })
}