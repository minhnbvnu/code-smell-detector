function drawPattern(imgdata) {
        var html = [], i, j;

        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++) {
                var gray = (imgdata[i][j] - mingray) / (maxgray - mingray); // 以最大和最小灰度为界，计算出相对灰度
                var extra;
                switch (Math.ceil(gray * 5)) {
                case 0:
                    extra = 'white';
                    break;
                case 1:
                    extra = 'tiny';
                    break;
                case 2:
                    extra = 'small';
                    break;
                case 3:
                    extra = 'medium';
                    break;
                default:
                    extra = '';
                    break;
                }
                html.push('<div class="cell ', extra,'" style="left:', j * 20, 'px;top:', i * 20, 'px;"><div class="corner"></div></div>');
            }
        }
        $pattern.html(html.join('')).show();

        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++) {
                flash(i, j);
            }
        }
    }