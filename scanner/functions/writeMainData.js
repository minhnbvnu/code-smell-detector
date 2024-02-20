function writeMainData(gfp) {
	        var gr, ch, sfb, data_bits, tot_bits = 0;
	        var gfc = gfp.internal_flags;
	        var l3_side = gfc.l3_side;

	        if (gfp.version == 1) {
	            /* MPEG 1 */
	            for (gr = 0; gr < 2; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    var gi = l3_side.tt[gr][ch];
	                    var slen1 = Takehiro.slen1_tab[gi.scalefac_compress];
	                    var slen2 = Takehiro.slen2_tab[gi.scalefac_compress];
	                    data_bits = 0;
	                    for (sfb = 0; sfb < gi.sfbdivide; sfb++) {
	                        if (gi.scalefac[sfb] == -1)
	                            continue;
	                        /* scfsi is used */
	                        putbits2(gfc, gi.scalefac[sfb], slen1);
	                        data_bits += slen1;
	                    }
	                    for (; sfb < gi.sfbmax; sfb++) {
	                        if (gi.scalefac[sfb] == -1)
	                            continue;
	                        /* scfsi is used */
	                        putbits2(gfc, gi.scalefac[sfb], slen2);
	                        data_bits += slen2;
	                    }

	                    if (gi.block_type == Encoder.SHORT_TYPE) {
	                        data_bits += ShortHuffmancodebits(gfc, gi);
	                    } else {
	                        data_bits += LongHuffmancodebits(gfc, gi);
	                    }
	                    data_bits += huffman_coder_count1(gfc, gi);
	                    /* does bitcount in quantize.c agree with actual bit count? */
	                    tot_bits += data_bits;
	                }
	                /* for ch */
	            }
	            /* for gr */
	        } else {
	            /* MPEG 2 */
	            gr = 0;
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var gi = l3_side.tt[gr][ch];
	                var i, sfb_partition, scale_bits = 0;
	                data_bits = 0;
	                sfb = 0;
	                sfb_partition = 0;

	                if (gi.block_type == Encoder.SHORT_TYPE) {
	                    for (; sfb_partition < 4; sfb_partition++) {
	                        var sfbs = gi.sfb_partition_table[sfb_partition] / 3;
	                        var slen = gi.slen[sfb_partition];
	                        for (i = 0; i < sfbs; i++, sfb++) {
	                            putbits2(gfc,
	                                Math.max(gi.scalefac[sfb * 3 + 0], 0), slen);
	                            putbits2(gfc,
	                                Math.max(gi.scalefac[sfb * 3 + 1], 0), slen);
	                            putbits2(gfc,
	                                Math.max(gi.scalefac[sfb * 3 + 2], 0), slen);
	                            scale_bits += 3 * slen;
	                        }
	                    }
	                    data_bits += ShortHuffmancodebits(gfc, gi);
	                } else {
	                    for (; sfb_partition < 4; sfb_partition++) {
	                        var sfbs = gi.sfb_partition_table[sfb_partition];
	                        var slen = gi.slen[sfb_partition];
	                        for (i = 0; i < sfbs; i++, sfb++) {
	                            putbits2(gfc, Math.max(gi.scalefac[sfb], 0), slen);
	                            scale_bits += slen;
	                        }
	                    }
	                    data_bits += LongHuffmancodebits(gfc, gi);
	                }
	                data_bits += huffman_coder_count1(gfc, gi);
	                /* does bitcount in quantize.c agree with actual bit count? */
	                tot_bits += scale_bits + data_bits;
	            }
	            /* for ch */
	        }
	        /* for gf */
	        return tot_bits;
	    }