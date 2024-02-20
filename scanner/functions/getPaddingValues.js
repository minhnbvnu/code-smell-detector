function getPaddingValues() {
    var rightPad = $('#padding-right').slider("getValue");
    var bottomPad = $('#padding-bottom').slider("getValue");
    var rightTop = (rightPad[0] / 100);
    var rightBottom = ((100 - rightPad[1]) / 100);
    var bottomLeft = (bottomPad[0] / 100);
    var bottomRight = ((100 - bottomPad[1]) / 100);

    return {verticalTop: rightTop, verticalBottom: rightBottom,
            horizontalLeft: bottomLeft, horizontalRight: bottomRight};
}