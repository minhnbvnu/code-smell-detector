	    function encodeSideInfo2(gfp, bitsPerFrame) {
	        var gfc = gfp.internal_flags;
	        var l3_side;
	        var gr, ch;

	        l3_side = gfc.l3_side;
	        gfc.header[gfc.h_ptr].ptr = 0;
	        Arrays.fill(gfc.header[gfc.h_ptr].buf, 0, gfc.sideinfo_len, 0);
	        if (gfp.out_samplerate < 16000)
	            writeheader(gfc, 0xffe, 12);
	        else
	            writeheader(gfc, 0xfff, 12);
	        writeheader(gfc, (gfp.version), 1);
	        writeheader(gfc, 4 - 3, 2);
	        writeheader(gfc, (!gfp.error_protection ? 1 : 0), 1);
	        writeheader(gfc, (gfc.bitrate_index), 4);
	        writeheader(gfc, (gfc.samplerate_index), 2);
	        writeheader(gfc, (gfc.padding), 1);
	        writeheader(gfc, (gfp.extension), 1);
	        writeheader(gfc, (gfp.mode.ordinal()), 2);
	        writeheader(gfc, (gfc.mode_ext), 2);
	        writeheader(gfc, (gfp.copyright), 1);
	        writeheader(gfc, (gfp.original), 1);
	        writeheader(gfc, (gfp.emphasis), 2);
	        if (gfp.error_protection) {
	            writeheader(gfc, 0, 16);
	            /* dummy */
	        }

	        if (gfp.version == 1) {
	            /* MPEG1 */
	            writeheader(gfc, (l3_side.main_data_begin), 9);

	            if (gfc.channels_out == 2)
	                writeheader(gfc, l3_side.private_bits, 3);
	            else
	                writeheader(gfc, l3_side.private_bits, 5);

	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var band;
	                for (band = 0; band < 4; band++) {
	                    writeheader(gfc, l3_side.scfsi[ch][band], 1);
	                }
	            }

	            for (gr = 0; gr < 2; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    var gi = l3_side.tt[gr][ch];
	                    writeheader(gfc, gi.part2_3_length + gi.part2_length, 12);
	                    writeheader(gfc, gi.big_values / 2, 9);
	                    writeheader(gfc, gi.global_gain, 8);
	                    writeheader(gfc, gi.scalefac_compress, 4);

	                    if (gi.block_type != Encoder.NORM_TYPE) {
	                        writeheader(gfc, 1, 1);
	                        /* window_switching_flag */
	                        writeheader(gfc, gi.block_type, 2);
	                        writeheader(gfc, gi.mixed_block_flag, 1);

	                        if (gi.table_select[0] == 14)
	                            gi.table_select[0] = 16;
	                        writeheader(gfc, gi.table_select[0], 5);
	                        if (gi.table_select[1] == 14)
	                            gi.table_select[1] = 16;
	                        writeheader(gfc, gi.table_select[1], 5);

	                        writeheader(gfc, gi.subblock_gain[0], 3);
	                        writeheader(gfc, gi.subblock_gain[1], 3);
	                        writeheader(gfc, gi.subblock_gain[2], 3);
	                    } else {
	                        writeheader(gfc, 0, 1);
	                        /* window_switching_flag */
	                        if (gi.table_select[0] == 14)
	                            gi.table_select[0] = 16;
	                        writeheader(gfc, gi.table_select[0], 5);
	                        if (gi.table_select[1] == 14)
	                            gi.table_select[1] = 16;
	                        writeheader(gfc, gi.table_select[1], 5);
	                        if (gi.table_select[2] == 14)
	                            gi.table_select[2] = 16;
	                        writeheader(gfc, gi.table_select[2], 5);

	                        writeheader(gfc, gi.region0_count, 4);
	                        writeheader(gfc, gi.region1_count, 3);
	                    }
	                    writeheader(gfc, gi.preflag, 1);
	                    writeheader(gfc, gi.scalefac_scale, 1);
	                    writeheader(gfc, gi.count1table_select, 1);
	                }
	            }
	        } else {
	            /* MPEG2 */
	            writeheader(gfc, (l3_side.main_data_begin), 8);
	            writeheader(gfc, l3_side.private_bits, gfc.channels_out);

	            gr = 0;
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var gi = l3_side.tt[gr][ch];
	                writeheader(gfc, gi.part2_3_length + gi.part2_length, 12);
	                writeheader(gfc, gi.big_values / 2, 9);
	                writeheader(gfc, gi.global_gain, 8);
	                writeheader(gfc, gi.scalefac_compress, 9);

	                if (gi.block_type != Encoder.NORM_TYPE) {
	                    writeheader(gfc, 1, 1);
	                    /* window_switching_flag */
	                    writeheader(gfc, gi.block_type, 2);
	                    writeheader(gfc, gi.mixed_block_flag, 1);

	                    if (gi.table_select[0] == 14)
	                        gi.table_select[0] = 16;
	                    writeheader(gfc, gi.table_select[0], 5);
	                    if (gi.table_select[1] == 14)
	                        gi.table_select[1] = 16;
	                    writeheader(gfc, gi.table_select[1], 5);

	                    writeheader(gfc, gi.subblock_gain[0], 3);
	                    writeheader(gfc, gi.subblock_gain[1], 3);
	                    writeheader(gfc, gi.subblock_gain[2], 3);
	                } else {
	                    writeheader(gfc, 0, 1);
	                    /* window_switching_flag */
	                    if (gi.table_select[0] == 14)
	                        gi.table_select[0] = 16;
	                    writeheader(gfc, gi.table_select[0], 5);
	                    if (gi.table_select[1] == 14)
	                        gi.table_select[1] = 16;
	                    writeheader(gfc, gi.table_select[1], 5);
	                    if (gi.table_select[2] == 14)
	                        gi.table_select[2] = 16;
	                    writeheader(gfc, gi.table_select[2], 5);

	                    writeheader(gfc, gi.region0_count, 4);
	                    writeheader(gfc, gi.region1_count, 3);
	                }

	                writeheader(gfc, gi.scalefac_scale, 1);
	                writeheader(gfc, gi.count1table_select, 1);
	            }
	        }

	        if (gfp.error_protection) {
	            /* (jo) error_protection: add crc16 information to header */
	            CRC_writeheader(gfc, gfc.header[gfc.h_ptr].buf);
	        }

	        {
	            var old = gfc.h_ptr;

	            gfc.h_ptr = (old + 1) & (LameInternalFlags.MAX_HEADER_BUF - 1);
	            gfc.header[gfc.h_ptr].write_timing = gfc.header[old].write_timing
	                + bitsPerFrame;

	            if (gfc.h_ptr == gfc.w_ptr) {
	                /* yikes! we are out of header buffer space */
	                System.err
	                    .println("Error: MAX_HEADER_BUF too small in bitstream.c \n");
	            }

	        }
	    }