function coreSHA2(message, messageLen, variant)
	{
		var a, b, c, d, e, f, g, h, T1, T2, H, numRounds, lengthPosition, i, t,
			binaryStringInc, binaryStringMult, safeAdd_2, safeAdd_4, safeAdd_5,
			gamma0, gamma1, sigma0, sigma1, ch, maj, Int, W = [], int1, int2, offset,
			appendedMessageLength, retVal,
			K = [
				0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
				0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
				0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
				0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
				0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
				0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
				0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
				0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
				0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
				0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
				0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
				0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
				0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
				0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
				0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
				0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
			],
			H_trunc = [
				0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
				0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
			],
			H_full = [
				0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
				0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
			];

		/* Set up the various function handles and variable for the specific
		 * variant */
		if ((variant === "SHA-224" || variant === "SHA-256") &&
			(2 & SUPPORTED_ALGS))
		{
			/* 32-bit variant */
			numRounds = 64;
			lengthPosition = (((messageLen + 65) >>> 9) << 4) + 15;
			binaryStringInc = 16;
			binaryStringMult = 1;
			Int = Number;
			safeAdd_2 = safeAdd_32_2;
			safeAdd_4 = safeAdd_32_4;
			safeAdd_5 = safeAdd_32_5;
			gamma0 = gamma0_32;
			gamma1 = gamma1_32;
			sigma0 = sigma0_32;
			sigma1 = sigma1_32;
			maj = maj_32;
			ch = ch_32;

			if ("SHA-224" === variant)
			{
				H = H_trunc;
			}
			else /* "SHA-256" === variant */
			{
				H = H_full;
			}
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			(4 & SUPPORTED_ALGS))
		{
			/* 64-bit variant */
			numRounds = 80;
			lengthPosition = (((messageLen + 128) >>> 10) << 5) + 31;
			binaryStringInc = 32;
			binaryStringMult = 2;
			Int = Int_64;
			safeAdd_2 = safeAdd_64_2;
			safeAdd_4 = safeAdd_64_4;
			safeAdd_5 = safeAdd_64_5;
			gamma0 = gamma0_64;
			gamma1 = gamma1_64;
			sigma0 = sigma0_64;
			sigma1 = sigma1_64;
			maj = maj_64;
			ch = ch_64;

			K = [
				new Int(K[ 0], 0xd728ae22), new Int(K[ 1], 0x23ef65cd),
				new Int(K[ 2], 0xec4d3b2f), new Int(K[ 3], 0x8189dbbc),
				new Int(K[ 4], 0xf348b538), new Int(K[ 5], 0xb605d019),
				new Int(K[ 6], 0xaf194f9b), new Int(K[ 7], 0xda6d8118),
				new Int(K[ 8], 0xa3030242), new Int(K[ 9], 0x45706fbe),
				new Int(K[10], 0x4ee4b28c), new Int(K[11], 0xd5ffb4e2),
				new Int(K[12], 0xf27b896f), new Int(K[13], 0x3b1696b1),
				new Int(K[14], 0x25c71235), new Int(K[15], 0xcf692694),
				new Int(K[16], 0x9ef14ad2), new Int(K[17], 0x384f25e3),
				new Int(K[18], 0x8b8cd5b5), new Int(K[19], 0x77ac9c65),
				new Int(K[20], 0x592b0275), new Int(K[21], 0x6ea6e483),
				new Int(K[22], 0xbd41fbd4), new Int(K[23], 0x831153b5),
				new Int(K[24], 0xee66dfab), new Int(K[25], 0x2db43210),
				new Int(K[26], 0x98fb213f), new Int(K[27], 0xbeef0ee4),
				new Int(K[28], 0x3da88fc2), new Int(K[29], 0x930aa725),
				new Int(K[30], 0xe003826f), new Int(K[31], 0x0a0e6e70),
				new Int(K[32], 0x46d22ffc), new Int(K[33], 0x5c26c926),
				new Int(K[34], 0x5ac42aed), new Int(K[35], 0x9d95b3df),
				new Int(K[36], 0x8baf63de), new Int(K[37], 0x3c77b2a8),
				new Int(K[38], 0x47edaee6), new Int(K[39], 0x1482353b),
				new Int(K[40], 0x4cf10364), new Int(K[41], 0xbc423001),
				new Int(K[42], 0xd0f89791), new Int(K[43], 0x0654be30),
				new Int(K[44], 0xd6ef5218), new Int(K[45], 0x5565a910),
				new Int(K[46], 0x5771202a), new Int(K[47], 0x32bbd1b8),
				new Int(K[48], 0xb8d2d0c8), new Int(K[49], 0x5141ab53),
				new Int(K[50], 0xdf8eeb99), new Int(K[51], 0xe19b48a8),
				new Int(K[52], 0xc5c95a63), new Int(K[53], 0xe3418acb),
				new Int(K[54], 0x7763e373), new Int(K[55], 0xd6b2b8a3),
				new Int(K[56], 0x5defb2fc), new Int(K[57], 0x43172f60),
				new Int(K[58], 0xa1f0ab72), new Int(K[59], 0x1a6439ec),
				new Int(K[60], 0x23631e28), new Int(K[61], 0xde82bde9),
				new Int(K[62], 0xb2c67915), new Int(K[63], 0xe372532b),
				new Int(0xca273ece, 0xea26619c), new Int(0xd186b8c7, 0x21c0c207),
				new Int(0xeada7dd6, 0xcde0eb1e), new Int(0xf57d4f7f, 0xee6ed178),
				new Int(0x06f067aa, 0x72176fba), new Int(0x0a637dc5, 0xa2c898a6),
				new Int(0x113f9804, 0xbef90dae), new Int(0x1b710b35, 0x131c471b),
				new Int(0x28db77f5, 0x23047d84), new Int(0x32caab7b, 0x40c72493),
				new Int(0x3c9ebe0a, 0x15c9bebc), new Int(0x431d67c4, 0x9c100d4c),
				new Int(0x4cc5d4be, 0xcb3e42b6), new Int(0x597f299c, 0xfc657e2a),
				new Int(0x5fcb6fab, 0x3ad6faec), new Int(0x6c44198c, 0x4a475817)
			];

			if ("SHA-384" === variant)
			{
				H = [
					new Int(0xcbbb9d5d, H_trunc[0]), new Int(0x0629a292a, H_trunc[1]),
					new Int(0x9159015a, H_trunc[2]), new Int(0x0152fecd8, H_trunc[3]),
					new Int(0x67332667, H_trunc[4]), new Int(0x98eb44a87, H_trunc[5]),
					new Int(0xdb0c2e0d, H_trunc[6]), new Int(0x047b5481d, H_trunc[7])
				];
			}
			else /* "SHA-512" === variant */
			{
				H = [
					new Int(H_full[0], 0xf3bcc908), new Int(H_full[1], 0x84caa73b),
					new Int(H_full[2], 0xfe94f82b), new Int(H_full[3], 0x5f1d36f1),
					new Int(H_full[4], 0xade682d1), new Int(H_full[5], 0x2b3e6c1f),
					new Int(H_full[6], 0xfb41bd6b), new Int(H_full[7], 0x137e2179)
				];
			}
		}
		else
		{
			throw "Unexpected error in SHA-2 implementation";
		}

		while (message.length <= lengthPosition)
		{
			message.push(0);
		}
		/* Append '1' at the end of the binary string */
		message[messageLen >>> 5] |= 0x80 << (24 - messageLen % 32);
		/* Append length of binary string in the position such that the new
		 * length is correct */
		message[lengthPosition] = messageLen;

		appendedMessageLength = message.length;

		for (i = 0; i < appendedMessageLength; i += binaryStringInc)
		{
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];
			f = H[5];
			g = H[6];
			h = H[7];

			for (t = 0; t < numRounds; t += 1)
			{
				if (t < 16)
				{
					offset = t * binaryStringMult + i;
					int1 = (message.length <= offset) ? 0 : message[offset];
					int2 = (message.length <= offset + 1) ? 0 : message[offset + 1];
					/* Bit of a hack - for 32-bit, the second term is ignored */
					W[t] = new Int(int1, int2);
				}
				else
				{
					W[t] = safeAdd_4(
							gamma1(W[t - 2]), W[t - 7],
							gamma0(W[t - 15]), W[t - 16]
						);
				}

				T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
				T2 = safeAdd_2(sigma0(a), maj(a, b, c));
				h = g;
				g = f;
				f = e;
				e = safeAdd_2(d, T1);
				d = c;
				c = b;
				b = a;
				a = safeAdd_2(T1, T2);

			}

			H[0] = safeAdd_2(a, H[0]);
			H[1] = safeAdd_2(b, H[1]);
			H[2] = safeAdd_2(c, H[2]);
			H[3] = safeAdd_2(d, H[3]);
			H[4] = safeAdd_2(e, H[4]);
			H[5] = safeAdd_2(f, H[5]);
			H[6] = safeAdd_2(g, H[6]);
			H[7] = safeAdd_2(h, H[7]);
		}

		if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0], H[1], H[2], H[3],
				H[4], H[5], H[6]
			];
		}
		else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = H;
		}
		else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder
			];
		}
		else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder,
				H[6].highOrder, H[6].lowOrder,
				H[7].highOrder, H[7].lowOrder
			];
		}
		else /* This should never be reached */
		{
			throw "Unexpected error in SHA-2 implementation";
		}

		return retVal;
	}