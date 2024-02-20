function getLeftTopBottomRightCssText(left, top, bottom, right) {
          left = !left ? '0' : left + 'px';
          top = !top ? '0' : top + 'px';
          bottom = !bottom ? '0' : bottom + 'px';
          right = !right ? '0' : right + 'px';

          return 'left: ' + left + '; top: ' + top + '; right: ' + right + '; bottom: ' + bottom + ';';
        }