function addToQuadPath(x, y, ctrlX, ctrlY, toX, toY) {
            x *= scale;
            y *= scale;
            ctrlX *= scale;
            ctrlY *= scale;
            toX *= scale;
            toY *= scale;

            if (!quadPath) quadPath = 'M ' + x + ' ' + y + ' Q ' + ctrlX + ' ' + ctrlY + ' ' + toX + ' ' + toY;
            else quadPath += ' Q ' + ctrlX + ' ' + ctrlY + ' ' + toX + ' ' + toY;

        }