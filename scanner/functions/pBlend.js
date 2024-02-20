function pBlend() {
            sa = data2[pixIn + 3] / 255 * opacity;
            da = inData[pix + 3] / 255;
            da2 = (sa + da - sa * da);
            demultiply = 255 / da2;

            sr = data2[pixIn] / 255 * sa;
            sg = data2[pixIn + 1] / 255 * sa;
            sb = data2[pixIn + 2] / 255 * sa;

            dr = inData[pix] / 255 * da;
            dg = inData[pix + 1] / 255 * da;
            db = inData[pix + 2] / 255 * da;

            fn();

            outData[pix] = or * demultiply;
            outData[pix + 1] = og * demultiply;
            outData[pix + 2] = ob * demultiply;
            outData[pix + 3] = da2 * 255;
        }