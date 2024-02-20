function sBlend() {
            dr = inData[pix];
            dg = inData[pix + 1];
            db = inData[pix + 2];

            sr = data2[pixIn];
            sg = data2[pixIn + 1];
            sb = data2[pixIn + 2];

            fn();

            outData[pix] = or;
            outData[pix + 1] = og;
            outData[pix + 2] = ob;
            outData[pix + 3] = inData[pix + 3];

            a = opacity * data2[pixIn + 3] / 255;
            if (a < 1) {
                a2 = 1 - a;
                outData[pix] = (inData[pix] * a2 + outData[pix] * a);
                outData[pix + 1] = (inData[pix + 1] * a2 + outData[pix + 1] * a);
                outData[pix + 2] = (inData[pix + 2] * a2 + outData[pix + 2] * a);
            }
        }