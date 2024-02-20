function convolve5x5(inData, outData, width, height, kernel, alpha, invert, mono) {
    var x, y, n = width * height * 4,
        idx, r, g, b, a,
        pyc, pyp, pyn, pypp, pynn,
        pxc, pxp, pxn, pxpp, pxnn,

        k00 = kernel[0][0], k01 = kernel[0][1], k02 = kernel[0][2], k03 = kernel[0][3], k04 = kernel[0][4],
        k10 = kernel[1][0], k11 = kernel[1][1], k12 = kernel[1][2], k13 = kernel[1][3], k14 = kernel[1][4],
        k20 = kernel[2][0], k21 = kernel[2][1], k22 = kernel[2][2], k23 = kernel[2][3], k24 = kernel[2][4],
        k30 = kernel[3][0], k31 = kernel[3][1], k32 = kernel[3][2], k33 = kernel[3][3], k34 = kernel[3][4],
        k40 = kernel[4][0], k41 = kernel[4][1], k42 = kernel[4][2], k43 = kernel[4][3], k44 = kernel[4][4],

        p00, p01, p02, p03, p04,
        p10, p11, p12, p13, p14,
        p20, p21, p22, p23, p24,
        p30, p31, p32, p33, p34,
        p40, p41, p42, p43, p44;

    for (y = 0; y < height; y += 1) {
        pyc = y * width * 4;
        pyp = pyc - width * 4;
        pypp = pyc - width * 4 * 2;
        pyn = pyc + width * 4;
        pynn = pyc + width * 4 * 2;

        if (y < 1) {
            pyp = pyc;
        }
        if (y >= width - 1) {
            pyn = pyc;
        }
        if (y < 2) {
            pypp = pyp;
        }
        if (y >= width - 2) {
            pynn = pyn;
        }

        for (x = 0; x < width; x += 1) {
            idx = (y * width + x) * 4;

            pxc = x * 4;
            pxp = pxc - 4;
            pxn = pxc + 4;
            pxpp = pxc - 8;
            pxnn = pxc + 8;

            if (x < 1) {
                pxp = pxc;
            }
            if (x >= width - 1) {
                pxn = pxc;
            }
            if (x < 2) {
                pxpp = pxp;
            }
            if (x >= width - 2) {
                pxnn = pxn;
            }

            p00 = pypp + pxpp;
            p01 = pypp + pxp;
            p02 = pypp + pxc;
            p03 = pypp + pxn;
            p04 = pypp + pxnn;
            p10 = pyp + pxpp;
            p11 = pyp + pxp;
            p12 = pyp + pxc;
            p13 = pyp + pxn;
            p14 = pyp + pxnn;
            p20 = pyc + pxpp;
            p21 = pyc + pxp;
            p22 = pyc + pxc;
            p23 = pyc + pxn;
            p24 = pyc + pxnn;
            p30 = pyn + pxpp;
            p31 = pyn + pxp;
            p32 = pyn + pxc;
            p33 = pyn + pxn;
            p34 = pyn + pxnn;
            p40 = pynn + pxpp;
            p41 = pynn + pxp;
            p42 = pynn + pxc;
            p43 = pynn + pxn;
            p44 = pynn + pxnn;

            r = inData[p00] * k00 + inData[p01] * k01 + inData[p02] * k02 + inData[p03] * k04 + inData[p02] * k04 +
                inData[p10] * k10 + inData[p11] * k11 + inData[p12] * k12 + inData[p13] * k14 + inData[p12] * k14 +
                inData[p20] * k20 + inData[p21] * k21 + inData[p22] * k22 + inData[p23] * k24 + inData[p22] * k24 +
                inData[p30] * k30 + inData[p31] * k31 + inData[p32] * k32 + inData[p33] * k34 + inData[p32] * k34 +
                inData[p40] * k40 + inData[p41] * k41 + inData[p42] * k42 + inData[p43] * k44 + inData[p42] * k44;

            g = inData[p00 + 1] * k00 + inData[p01 + 1] * k01 + inData[p02 + 1] * k02 + inData[p03 + 1] * k04 + inData[p02 + 1] * k04 +
                inData[p10 + 1] * k10 + inData[p11 + 1] * k11 + inData[p12 + 1] * k12 + inData[p13 + 1] * k14 + inData[p12 + 1] * k14 +
                inData[p20 + 1] * k20 + inData[p21 + 1] * k21 + inData[p22 + 1] * k22 + inData[p23 + 1] * k24 + inData[p22 + 1] * k24 +
                inData[p30 + 1] * k30 + inData[p31 + 1] * k31 + inData[p32 + 1] * k32 + inData[p33 + 1] * k34 + inData[p32 + 1] * k34 +
                inData[p40 + 1] * k40 + inData[p41 + 1] * k41 + inData[p42 + 1] * k42 + inData[p43 + 1] * k44 + inData[p42 + 1] * k44;

            b = inData[p00 + 2] * k00 + inData[p01 + 2] * k01 + inData[p02 + 2] * k02 + inData[p03 + 2] * k04 + inData[p02 + 2] * k04 +
                inData[p10 + 2] * k10 + inData[p11 + 2] * k11 + inData[p12 + 2] * k12 + inData[p13 + 2] * k14 + inData[p12 + 2] * k14 +
                inData[p20 + 2] * k20 + inData[p21 + 2] * k21 + inData[p22 + 2] * k22 + inData[p23 + 2] * k24 + inData[p22 + 2] * k24 +
                inData[p30 + 2] * k30 + inData[p31 + 2] * k31 + inData[p32 + 2] * k32 + inData[p33 + 2] * k34 + inData[p32 + 2] * k34 +
                inData[p40 + 2] * k40 + inData[p41 + 2] * k41 + inData[p42 + 2] * k42 + inData[p43 + 2] * k44 + inData[p42 + 2] * k44;

            if (alpha) {
                a = inData[p00 + 3] * k00 + inData[p01 + 3] * k01 + inData[p02 + 3] * k02 + inData[p03 + 3] * k04 + inData[p02 + 3] * k04 +
                    inData[p10 + 3] * k10 + inData[p11 + 3] * k11 + inData[p12 + 3] * k12 + inData[p13 + 3] * k14 + inData[p12 + 3] * k14 +
                    inData[p20 + 3] * k20 + inData[p21 + 3] * k21 + inData[p22 + 3] * k22 + inData[p23 + 3] * k24 + inData[p22 + 3] * k24 +
                    inData[p30 + 3] * k30 + inData[p31 + 3] * k31 + inData[p32 + 3] * k32 + inData[p33 + 3] * k34 + inData[p32 + 3] * k34 +
                    inData[p40 + 3] * k40 + inData[p41 + 3] * k41 + inData[p42 + 3] * k42 + inData[p43 + 3] * k44 + inData[p42 + 3] * k44;
            } else {
                a = inData[idx + 3];
            }

            if (mono) {
                r = g = b = (r + g + b) / 3;
            }

            if (invert) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
            }

            outData[idx] = r;
            outData[idx + 1] = g;
            outData[idx + 2] = b;
            outData[idx + 3] = a;
        }
    }
}