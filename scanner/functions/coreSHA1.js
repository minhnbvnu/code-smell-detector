function coreSHA1(message, messageLen)
	{
		var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
			maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, i, t,
			safeAdd_5 = safeAdd_32_5, appendedMessageLength, offset,
			H = [
				0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
			];

		offset = (((messageLen + 65) >>> 9) << 4) + 15;
		while (message.length <= offset)
		{
			message.push(0);
		}
		/* Append '1' at the end of the binary string */
        message[messageLen >>> 5] |= 0x80 << (24 - (messageLen % 32));
		/* Append length of binary string in the position such that the new
		length is a multiple of 512.  Logic does not work for even multiples
		of 512 but there can never be even multiples of 512 */
		message[offset] = messageLen;

		appendedMessageLength = message.length;

		for (i = 0; i < appendedMessageLength; i += 16)
		{
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];

			for (t = 0; t < 80; t += 1)
			{
				if (t < 16)
				{
					W[t] = message[t + i];
				}
				else
				{
					W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
				}

				if (t < 20)
				{
					T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, 0x5a827999, W[t]);
				}
				else if (t < 40)
				{
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0x6ed9eba1, W[t]);
				}
				else if (t < 60)
				{
					T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, 0x8f1bbcdc, W[t]);
				} else {
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0xca62c1d6, W[t]);
				}

				e = d;
				d = c;
				c = rotl(b, 30);
				b = a;
				a = T;
			}

			H[0] = safeAdd_2(a, H[0]);
			H[1] = safeAdd_2(b, H[1]);
			H[2] = safeAdd_2(c, H[2]);
			H[3] = safeAdd_2(d, H[3]);
			H[4] = safeAdd_2(e, H[4]);
		}

		return H;
	}