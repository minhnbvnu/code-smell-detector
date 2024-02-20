function reset_tlp_color(e, tlp) {
    d = {
        white: '#ffffff',
        green: '#00ff00',
        amber: '#ffcc22',
        red: '#ff0000'
    }
    e.simplecolorpicker('selectColor', d[tlp]);
}