function convolve3x3(inData, outData, width, height, kernel, alpha, invert, mono) {
    var x, y, n = width * height * 4,
        idx, r, g, b, a,
        pyc, pyp, pyn,
        pxc, pxp, pxn,

        k00 = kernel[0][0], k01 = kernel[0][1], k02 = kernel[0][2],
        k10 = kernel[1][0], k11 = kernel[1][1], k12 = kernel[1][2],
        k20 = kernel[2][0], k21 = kernel[2][1], k22 = kernel[2][2],

        p00, p01, p02,
        p10, p11, p12,
        p20, p21, p22;

    for (y = 0; y < height; y += 1) {
        pyc = y * width * 4;
        pyp = pyc - width * 4;
        pyn = pyc + width * 4;

        if (y < 1) {
            pyp = pyc;
        }
        if (y >= width - 1) {
            pyn = pyc;
        }

        for (x = 0; x < width; x += 1) {
            idx = (y * width + x) * 4;

            pxc = x * 4;
            pxp = pxc - 4;
            pxn = pxc + 4;

            if (x < 1) {
                pxp = pxc;
            }
            if (x >= width - 1) {
                pxn = pxc;
            }

            p00 = pyp + pxp;
            p01 = pyp + pxc;
            p02 = pyp + pxn;
            p10 = pyc + pxp;
            p11 = pyc + pxc;
            p12 = pyc + pxn;
            p20 = pyn + pxp;
            p21 = pyn + pxc;
            p22 = pyn + pxn;

            r = inData[p00] * k00 + inData[p01] * k01 + inData[p02] * k02 +
                inData[p10] * k10 + inData[p11] * k11 + inData[p12] * k12 +
                inData[p20] * k20 + inData[p21] * k21 + inData[p22] * k22;

            g = inData[p00 + 1] * k00 + inData[p01 + 1] * k01 + inData[p02 + 1] * k02 +
                inData[p10 + 1] * k10 + inData[p11 + 1] * k11 + inData[p12 + 1] * k12 +
                inData[p20 + 1] * k20 + inData[p21 + 1] * k21 + inData[p22 + 1] * k22;

            b = inData[p00 + 2] * k00 + inData[p01 + 2] * k01 + inData[p02 + 2] * k02 +
                inData[p10 + 2] * k10 + inData[p11 + 2] * k11 + inData[p12 + 2] * k12 +
                inData[p20 + 2] * k20 + inData[p21 + 2] * k21 + inData[p22 + 2] * k22;

            if (alpha) {
                a = inData[p00 + 3] * k00 + inData[p01 + 3] * k01 + inData[p02 + 3] * k02 +
                    inData[p10 + 3] * k10 + inData[p11 + 3] * k11 + inData[p12 + 3] * k12 +
                    inData[p20 + 3] * k20 + inData[p21 + 3] * k21 + inData[p22 + 3] * k22;
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