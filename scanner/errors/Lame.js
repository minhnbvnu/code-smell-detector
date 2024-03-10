	    this.setModules = function (_ga, _bs, _p, _qupvt, _qu, _vbr, _ver, _id3, _mpglib) {
	    function optimum_samplefreq(lowpassfreq, input_samplefreq) {
	        /*
	         * Rules:
	         *
	         * - if possible, sfb21 should NOT be used
	         */
	        var suggested_samplefreq = 44100;

	        if (input_samplefreq >= 48000)
	            suggested_samplefreq = 48000;
	        else if (input_samplefreq >= 44100)
	            suggested_samplefreq = 44100;
	        else if (input_samplefreq >= 32000)
	            suggested_samplefreq = 32000;
	        else if (input_samplefreq >= 24000)
	            suggested_samplefreq = 24000;
	        else if (input_samplefreq >= 22050)
	            suggested_samplefreq = 22050;
	        else if (input_samplefreq >= 16000)
	            suggested_samplefreq = 16000;
	        else if (input_samplefreq >= 12000)
	            suggested_samplefreq = 12000;
	        else if (input_samplefreq >= 11025)
	            suggested_samplefreq = 11025;
	        else if (input_samplefreq >= 8000)
	            suggested_samplefreq = 8000;

	        if (lowpassfreq == -1)
	            return suggested_samplefreq;

	        if (lowpassfreq <= 15960)
	            suggested_samplefreq = 44100;
	        if (lowpassfreq <= 15250)
	            suggested_samplefreq = 32000;
	        if (lowpassfreq <= 11220)
	            suggested_samplefreq = 24000;
	        if (lowpassfreq <= 9970)
	            suggested_samplefreq = 22050;
	        if (lowpassfreq <= 7230)
	            suggested_samplefreq = 16000;
	        if (lowpassfreq <= 5420)
	            suggested_samplefreq = 12000;
	        if (lowpassfreq <= 4510)
	            suggested_samplefreq = 11025;
	        if (lowpassfreq <= 3970)
	            suggested_samplefreq = 8000;

	        if (input_samplefreq < suggested_samplefreq) {
	            /*
	             * choose a valid MPEG sample frequency above the input sample
	             * frequency to avoid SFB21/12 bitrate bloat rh 061115
	             */
	            if (input_samplefreq > 44100) {
	                return 48000;
	            }
	            if (input_samplefreq > 32000) {
	                return 44100;
	            }
	            if (input_samplefreq > 24000) {
	                return 32000;
	            }
	            if (input_samplefreq > 22050) {
	                return 24000;
	            }
	            if (input_samplefreq > 16000) {
	                return 22050;
	            }
	            if (input_samplefreq > 12000) {
	                return 16000;
	            }
	            if (input_samplefreq > 11025) {
	                return 12000;
	            }
	            if (input_samplefreq > 8000) {
	                return 11025;
	            }
	            return 8000;
	        }
	        return suggested_samplefreq;
	    }
	    function lame_init_qval(gfp) {
	        var gfc = gfp.internal_flags;

	        switch (gfp.quality) {
	            default:
	            case 9: /* no psymodel, no noise shaping */
	                gfc.psymodel = 0;
	                gfc.noise_shaping = 0;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 8:
	                gfp.quality = 7;
	            //$FALL-THROUGH$
	            case 7:
	                /*
	                 * use psymodel (for short block and m/s switching), but no noise
	                 * shapping
	                 */
	                gfc.psymodel = 1;
	                gfc.noise_shaping = 0;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 6:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 5:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 4:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 3:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 1;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 2:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 1;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                /* inner loop */
	                gfc.full_outer_loop = 0;
	                break;

	            case 1:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 2;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 0:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 2;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                /*
	                 * type 2 disabled because of it slowness, in favor of full outer
	                 * loop search
	                 */
	                gfc.full_outer_loop = 0;
	                /*
	                 * full outer loop search disabled because of audible distortions it
	                 * may generate rh 060629
	                 */
	                break;
	        }

	    }
	    this.lame_init_params = function (gfp) {
	        var gfc = gfp.internal_flags;

	        gfc.Class_ID = 0;
	        if (gfc.ATH == null)
	            gfc.ATH = new ATH();
	        if (gfc.PSY == null)
	            gfc.PSY = new PSY();
	        if (gfc.rgdata == null)
	            gfc.rgdata = new ReplayGain();

	        gfc.channels_in = gfp.num_channels;
	        if (gfc.channels_in == 1)
	            gfp.mode = MPEGMode.MONO;
	        gfc.channels_out = (gfp.mode == MPEGMode.MONO) ? 1 : 2;
	        gfc.mode_ext = Encoder.MPG_MD_MS_LR;
	        if (gfp.mode == MPEGMode.MONO)
	            gfp.force_ms = false;
	        /*
	         * don't allow forced mid/side stereo for mono output
	         */

	        if (gfp.VBR == VbrMode.vbr_off && gfp.VBR_mean_bitrate_kbps != 128
	            && gfp.brate == 0)
	            gfp.brate = gfp.VBR_mean_bitrate_kbps;

	        if (gfp.VBR == VbrMode.vbr_off || gfp.VBR == VbrMode.vbr_mtrh
	            || gfp.VBR == VbrMode.vbr_mt) {
	            /* these modes can handle free format condition */
	        } else {
	            gfp.free_format = false;
	            /* mode can't be mixed with free format */
	        }

	        if (gfp.VBR == VbrMode.vbr_off && gfp.brate == 0) {
	            /* no bitrate or compression ratio specified, use 11.025 */
	            if (BitStream.EQ(gfp.compression_ratio, 0))
	                gfp.compression_ratio = 11.025;
	            /*
	             * rate to compress a CD down to exactly 128000 bps
	             */
	        }

	        /* find bitrate if user specify a compression ratio */
	        if (gfp.VBR == VbrMode.vbr_off && gfp.compression_ratio > 0) {

	            if (gfp.out_samplerate == 0)
	                gfp.out_samplerate = map2MP3Frequency((int)(0.97 * gfp.in_samplerate));
	            /*
	             * round up with a margin of 3 %
	             */

	            /*
	             * choose a bitrate for the output samplerate which achieves
	             * specified compression ratio
	             */
	            gfp.brate = 0 | (gfp.out_samplerate * 16 * gfc.channels_out / (1.e3 * gfp.compression_ratio));

	            /* we need the version for the bitrate table look up */
	            gfc.samplerate_index = SmpFrqIndex(gfp.out_samplerate, gfp);

	            if (!gfp.free_format) /*
	             * for non Free Format find the nearest allowed
	             * bitrate
	             */
	                gfp.brate = FindNearestBitrate(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	        }

	        if (gfp.out_samplerate != 0) {
	            if (gfp.out_samplerate < 16000) {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    8);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    64);
	            } else if (gfp.out_samplerate < 32000) {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    8);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    160);
	            } else {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    32);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    320);
	            }
	        }

	        /****************************************************************/
	        /* if a filter has not been enabled, see if we should add one: */
	        /****************************************************************/
	        if (gfp.lowpassfreq == 0) {
	            var lowpass = 16000.;

	            switch (gfp.VBR) {
	                case VbrMode.vbr_off:
	                {
	                    var lh = new LowPassHighPass();
	                    optimum_bandwidth(lh, gfp.brate);
	                    lowpass = lh.lowerlimit;
	                    break;
	                }
	                case VbrMode.vbr_abr:
	                {
	                    var lh = new LowPassHighPass();
	                    optimum_bandwidth(lh, gfp.VBR_mean_bitrate_kbps);
	                    lowpass = lh.lowerlimit;
	                    break;
	                }
	                case VbrMode.vbr_rh:
	                {
	                    var x = [19500, 19000, 18600, 18000, 17500, 16000,
	                        15600, 14900, 12500, 10000, 3950];
	                    if (0 <= gfp.VBR_q && gfp.VBR_q <= 9) {
	                        var a = x[gfp.VBR_q], b = x[gfp.VBR_q + 1], m = gfp.VBR_q_frac;
	                        lowpass = linear_int(a, b, m);
	                    } else {
	                        lowpass = 19500;
	                    }
	                    break;
	                }
	                default:
	                {
	                    var x = [19500, 19000, 18500, 18000, 17500, 16500,
	                        15500, 14500, 12500, 9500, 3950];
	                    if (0 <= gfp.VBR_q && gfp.VBR_q <= 9) {
	                        var a = x[gfp.VBR_q], b = x[gfp.VBR_q + 1], m = gfp.VBR_q_frac;
	                        lowpass = linear_int(a, b, m);
	                    } else {
	                        lowpass = 19500;
	                    }
	                }
	            }
	            if (gfp.mode == MPEGMode.MONO
	                && (gfp.VBR == VbrMode.vbr_off || gfp.VBR == VbrMode.vbr_abr))
	                lowpass *= 1.5;

	            gfp.lowpassfreq = lowpass | 0;
	        }

	        if (gfp.out_samplerate == 0) {
	            if (2 * gfp.lowpassfreq > gfp.in_samplerate) {
	                gfp.lowpassfreq = gfp.in_samplerate / 2;
	            }
	            gfp.out_samplerate = optimum_samplefreq(gfp.lowpassfreq | 0,
	                gfp.in_samplerate);
	        }

	        gfp.lowpassfreq = Math.min(20500, gfp.lowpassfreq);
	        gfp.lowpassfreq = Math.min(gfp.out_samplerate / 2, gfp.lowpassfreq);

	        if (gfp.VBR == VbrMode.vbr_off) {
	            gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                / (1.e3 * gfp.brate);
	        }
	        if (gfp.VBR == VbrMode.vbr_abr) {
	            gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                / (1.e3 * gfp.VBR_mean_bitrate_kbps);
	        }

	        /*
	         * do not compute ReplayGain values and do not find the peak sample if
	         * we can't store them
	         */
	        if (!gfp.bWriteVbrTag) {
	            gfp.findReplayGain = false;
	            gfp.decode_on_the_fly = false;
	            gfc.findPeakSample = false;
	        }
	        gfc.findReplayGain = gfp.findReplayGain;
	        gfc.decode_on_the_fly = gfp.decode_on_the_fly;

	        if (gfc.decode_on_the_fly)
	            gfc.findPeakSample = true;

	        if (gfc.findReplayGain) {
	            if (ga.InitGainAnalysis(gfc.rgdata, gfp.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) {
	                gfp.internal_flags = null;
	                return -6;
	            }
	        }

	        if (gfc.decode_on_the_fly && !gfp.decode_only) {
	            if (gfc.hip != null) {
	                mpglib.hip_decode_exit(gfc.hip);
	            }
	            gfc.hip = mpglib.hip_decode_init();
	        }

	        gfc.mode_gr = gfp.out_samplerate <= 24000 ? 1 : 2;
	        /*
	         * Number of granules per frame
	         */
	        gfp.framesize = 576 * gfc.mode_gr;
	        gfp.encoder_delay = Encoder.ENCDELAY;

	        gfc.resample_ratio = gfp.in_samplerate / gfp.out_samplerate;

	        /**
	         * <PRE>
	         *  sample freq       bitrate     compression ratio
	         *     [kHz]      [kbps/channel]   for 16 bit input
	         *     44.1            56               12.6
	         *     44.1            64               11.025
	         *     44.1            80                8.82
	         *     22.05           24               14.7
	         *     22.05           32               11.025
	         *     22.05           40                8.82
	         *     16              16               16.0
	         *     16              24               10.667
	         * </PRE>
	         */
	        /**
	         * <PRE>
	         *  For VBR, take a guess at the compression_ratio.
	         *  For example:
	         *
	         *    VBR_q    compression     like
	         *     -        4.4         320 kbps/44 kHz
	         *   0...1      5.5         256 kbps/44 kHz
	         *     2        7.3         192 kbps/44 kHz
	         *     4        8.8         160 kbps/44 kHz
	         *     6       11           128 kbps/44 kHz
	         *     9       14.7          96 kbps
	         *
	         *  for lower bitrates, downsample with --resample
	         * </PRE>
	         */
	        switch (gfp.VBR) {
	            case VbrMode.vbr_mt:
	            case VbrMode.vbr_rh:
	            case VbrMode.vbr_mtrh:
	            {
	                /* numbers are a bit strange, but they determine the lowpass value */
	                var cmp = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14,
	                    15, 16.5];
	                gfp.compression_ratio = cmp[gfp.VBR_q];
	            }
	                break;
	            case VbrMode.vbr_abr:
	                gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                    / (1.e3 * gfp.VBR_mean_bitrate_kbps);
	                break;
	            default:
	                gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                    / (1.e3 * gfp.brate);
	                break;
	        }

	        /*
	         * mode = -1 (not set by user) or mode = MONO (because of only 1 input
	         * channel). If mode has not been set, then select J-STEREO
	         */
	        if (gfp.mode == MPEGMode.NOT_SET) {
	            gfp.mode = MPEGMode.JOINT_STEREO;
	        }

	        /* apply user driven high pass filter */
	        if (gfp.highpassfreq > 0) {
	            gfc.highpass1 = 2. * gfp.highpassfreq;

	            if (gfp.highpasswidth >= 0)
	                gfc.highpass2 = 2. * (gfp.highpassfreq + gfp.highpasswidth);
	            else
	            /* 0% above on default */
	                gfc.highpass2 = (1 + 0.00) * 2. * gfp.highpassfreq;

	            gfc.highpass1 /= gfp.out_samplerate;
	            gfc.highpass2 /= gfp.out_samplerate;
	        } else {
	            gfc.highpass1 = 0;
	            gfc.highpass2 = 0;
	        }
	        /* apply user driven low pass filter */
	        if (gfp.lowpassfreq > 0) {
	            gfc.lowpass2 = 2. * gfp.lowpassfreq;
	            if (gfp.lowpasswidth >= 0) {
	                gfc.lowpass1 = 2. * (gfp.lowpassfreq - gfp.lowpasswidth);
	                if (gfc.lowpass1 < 0) /* has to be >= 0 */
	                    gfc.lowpass1 = 0;
	            } else { /* 0% below on default */
	                gfc.lowpass1 = (1 - 0.00) * 2. * gfp.lowpassfreq;
	            }
	            gfc.lowpass1 /= gfp.out_samplerate;
	            gfc.lowpass2 /= gfp.out_samplerate;
	        } else {
	            gfc.lowpass1 = 0;
	            gfc.lowpass2 = 0;
	        }

	        /**********************************************************************/
	        /* compute info needed for polyphase filter (filter type==0, default) */
	        /**********************************************************************/
	        lame_init_params_ppflt(gfp);
	        /*******************************************************
	         * samplerate and bitrate index
	         *******************************************************/
	        gfc.samplerate_index = SmpFrqIndex(gfp.out_samplerate, gfp);
	        if (gfc.samplerate_index < 0) {
	            gfp.internal_flags = null;
	            return -1;
	        }

	        if (gfp.VBR == VbrMode.vbr_off) {
	            if (gfp.free_format) {
	                gfc.bitrate_index = 0;
	            } else {
	                gfp.brate = FindNearestBitrate(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	                gfc.bitrate_index = BitrateIndex(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	                if (gfc.bitrate_index <= 0) {
	                    gfp.internal_flags = null;
	                    return -1;
	                }
	            }
	        } else {
	            gfc.bitrate_index = 1;
	        }

	        /* for CBR, we will write an "info" tag. */

	        if (gfp.analysis)
	            gfp.bWriteVbrTag = false;

	        /* some file options not allowed if output is: not specified or stdout */
	        if (gfc.pinfo != null)
	            gfp.bWriteVbrTag = false;
	        /* disable Xing VBR tag */

	        bs.init_bit_stream_w(gfc);

	        var j = gfc.samplerate_index + (3 * gfp.version) + 6
	            * (gfp.out_samplerate < 16000 ? 1 : 0);
	        for (var i = 0; i < Encoder.SBMAX_l + 1; i++)
	            gfc.scalefac_band.l[i] = qupvt.sfBandIndex[j].l[i];

	        for (var i = 0; i < Encoder.PSFB21 + 1; i++) {
	            var size = (gfc.scalefac_band.l[22] - gfc.scalefac_band.l[21])
	                / Encoder.PSFB21;
	            var start = gfc.scalefac_band.l[21] + i * size;
	            gfc.scalefac_band.psfb21[i] = start;
	        }
	        gfc.scalefac_band.psfb21[Encoder.PSFB21] = 576;

	        for (var i = 0; i < Encoder.SBMAX_s + 1; i++)
	            gfc.scalefac_band.s[i] = qupvt.sfBandIndex[j].s[i];

	        for (var i = 0; i < Encoder.PSFB12 + 1; i++) {
	            var size = (gfc.scalefac_band.s[13] - gfc.scalefac_band.s[12])
	                / Encoder.PSFB12;
	            var start = gfc.scalefac_band.s[12] + i * size;
	            gfc.scalefac_band.psfb12[i] = start;
	        }
	        gfc.scalefac_band.psfb12[Encoder.PSFB12] = 192;
	        /* determine the mean bitrate for main data */
	        if (gfp.version == 1) /* MPEG 1 */
	            gfc.sideinfo_len = (gfc.channels_out == 1) ? 4 + 17 : 4 + 32;
	        else
	        /* MPEG 2 */
	            gfc.sideinfo_len = (gfc.channels_out == 1) ? 4 + 9 : 4 + 17;

	        if (gfp.error_protection)
	            gfc.sideinfo_len += 2;

	        lame_init_bitstream(gfp);

	        gfc.Class_ID = LAME_ID;

	        {
	            var k;

	            for (k = 0; k < 19; k++)
	                gfc.nsPsy.pefirbuf[k] = 700 * gfc.mode_gr * gfc.channels_out;

	            if (gfp.ATHtype == -1)
	                gfp.ATHtype = 4;
	        }

	        switch (gfp.VBR) {

	            case VbrMode.vbr_mt:
	                gfp.VBR = VbrMode.vbr_mtrh;
	            //$FALL-THROUGH$
	            case VbrMode.vbr_mtrh:
	            {
	                if (gfp.useTemporal == null) {
	                    gfp.useTemporal = false;
	                    /* off by default for this VBR mode */
	                }

	                p.apply_preset(gfp, 500 - (gfp.VBR_q * 10), 0);
	                /**
	                 * <PRE>
	                 *   The newer VBR code supports only a limited
	                 *     subset of quality levels:
	                 *     9-5=5 are the same, uses x^3/4 quantization
	                 *   4-0=0 are the same  5 plus best huffman divide code
	                 * </PRE>
	                 */
	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;
	                if (gfp.quality < 5)
	                    gfp.quality = 0;
	                if (gfp.quality > 5)
	                    gfp.quality = 5;

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                /*
	                 * sfb21 extra only with MPEG-1 at higher sampling rates
	                 */
	                if (gfp.experimentalY)
	                    gfc.sfb21_extra = false;
	                else
	                    gfc.sfb21_extra = (gfp.out_samplerate > 44000);

	                gfc.iteration_loop = new VBRNewIterationLoop(qu);
	                break;

	            }
	            case VbrMode.vbr_rh:
	            {

	                p.apply_preset(gfp, 500 - (gfp.VBR_q * 10), 0);

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                /*
	                 * sfb21 extra only with MPEG-1 at higher sampling rates
	                 */
	                if (gfp.experimentalY)
	                    gfc.sfb21_extra = false;
	                else
	                    gfc.sfb21_extra = (gfp.out_samplerate > 44000);

	                /*
	                 * VBR needs at least the output of GPSYCHO, so we have to garantee
	                 * that by setting a minimum quality level, actually level 6 does
	                 * it. down to level 6
	                 */
	                if (gfp.quality > 6)
	                    gfp.quality = 6;

	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;

	                gfc.iteration_loop = new VBROldIterationLoop(qu);
	                break;
	            }

	            default: /* cbr/abr */
	            {
	                var vbrmode;

	                /*
	                 * no sfb21 extra with CBR code
	                 */
	                gfc.sfb21_extra = false;

	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;

	                vbrmode = gfp.VBR;
	                if (vbrmode == VbrMode.vbr_off)
	                    gfp.VBR_mean_bitrate_kbps = gfp.brate;
	                /* second, set parameters depending on bitrate */
	                p.apply_preset(gfp, gfp.VBR_mean_bitrate_kbps, 0);
	                gfp.VBR = vbrmode;

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                if (vbrmode == VbrMode.vbr_off) {
	                    gfc.iteration_loop = new CBRNewIterationLoop(qu);
	                } else {
	                    gfc.iteration_loop = new ABRIterationLoop(qu);
	                }
	                break;
	            }
	        }
	        /* initialize default values common for all modes */

	        if (gfp.VBR != VbrMode.vbr_off) { /* choose a min/max bitrate for VBR */
	            /* if the user didn't specify VBR_max_bitrate: */
	            gfc.VBR_min_bitrate = 1;
	            /*
	             * default: allow 8 kbps (MPEG-2) or 32 kbps (MPEG-1)
	             */
	            gfc.VBR_max_bitrate = 14;
	            /*
	             * default: allow 160 kbps (MPEG-2) or 320 kbps (MPEG-1)
	             */
	            if (gfp.out_samplerate < 16000)
	                gfc.VBR_max_bitrate = 8;
	            /* default: allow 64 kbps (MPEG-2.5) */
	            if (gfp.VBR_min_bitrate_kbps != 0) {
	                gfp.VBR_min_bitrate_kbps = FindNearestBitrate(
	                    gfp.VBR_min_bitrate_kbps, gfp.version,
	                    gfp.out_samplerate);
	                gfc.VBR_min_bitrate = BitrateIndex(gfp.VBR_min_bitrate_kbps,
	                    gfp.version, gfp.out_samplerate);
	                if (gfc.VBR_min_bitrate < 0)
	                    return -1;
	            }
	            if (gfp.VBR_max_bitrate_kbps != 0) {
	                gfp.VBR_max_bitrate_kbps = FindNearestBitrate(
	                    gfp.VBR_max_bitrate_kbps, gfp.version,
	                    gfp.out_samplerate);
	                gfc.VBR_max_bitrate = BitrateIndex(gfp.VBR_max_bitrate_kbps,
	                    gfp.version, gfp.out_samplerate);
	                if (gfc.VBR_max_bitrate < 0)
	                    return -1;
	            }
	            gfp.VBR_min_bitrate_kbps = Tables.bitrate_table[gfp.version][gfc.VBR_min_bitrate];
	            gfp.VBR_max_bitrate_kbps = Tables.bitrate_table[gfp.version][gfc.VBR_max_bitrate];
	            gfp.VBR_mean_bitrate_kbps = Math.min(
	                Tables.bitrate_table[gfp.version][gfc.VBR_max_bitrate],
	                gfp.VBR_mean_bitrate_kbps);
	            gfp.VBR_mean_bitrate_kbps = Math.max(
	                Tables.bitrate_table[gfp.version][gfc.VBR_min_bitrate],
	                gfp.VBR_mean_bitrate_kbps);
	        }

	        /* just another daily changing developer switch */
	        if (gfp.tune) {
	            gfc.PSY.mask_adjust += gfp.tune_value_a;
	            gfc.PSY.mask_adjust_short += gfp.tune_value_a;
	        }

	        /* initialize internal qval settings */
	        lame_init_qval(gfp);
	        /*
	         * automatic ATH adjustment on
	         */
	        if (gfp.athaa_type < 0)
	            gfc.ATH.useAdjust = 3;
	        else
	            gfc.ATH.useAdjust = gfp.athaa_type;

	        /* initialize internal adaptive ATH settings -jd */
	        gfc.ATH.aaSensitivityP = Math.pow(10.0, gfp.athaa_sensitivity
	            / -10.0);

	        if (gfp.short_blocks == null) {
	            gfp.short_blocks = ShortBlock.short_block_allowed;
	        }

	        /*
	         * Note Jan/2003: Many hardware decoders cannot handle short blocks in
	         * regular stereo mode unless they are coupled (same type in both
	         * channels) it is a rare event (1 frame per min. or so) that LAME would
	         * use uncoupled short blocks, so lets turn them off until we decide how
	         * to handle this. No other encoders allow uncoupled short blocks, even
	         * though it is in the standard.
	         */
	        /*
	         * rh 20040217: coupling makes no sense for mono and dual-mono streams
	         */
	        if (gfp.short_blocks == ShortBlock.short_block_allowed
	            && (gfp.mode == MPEGMode.JOINT_STEREO || gfp.mode == MPEGMode.STEREO)) {
	            gfp.short_blocks = ShortBlock.short_block_coupled;
	        }

	        if (gfp.quant_comp < 0)
	            gfp.quant_comp = 1;
	        if (gfp.quant_comp_short < 0)
	            gfp.quant_comp_short = 0;

	        if (gfp.msfix < 0)
	            gfp.msfix = 0;

	        /* select psychoacoustic model */
	        gfp.exp_nspsytune = gfp.exp_nspsytune | 1;

	        if (gfp.internal_flags.nsPsy.attackthre < 0)
	            gfp.internal_flags.nsPsy.attackthre = PsyModel.NSATTACKTHRE;
	        if (gfp.internal_flags.nsPsy.attackthre_s < 0)
	            gfp.internal_flags.nsPsy.attackthre_s = PsyModel.NSATTACKTHRE_S;


	        if (gfp.scale < 0)
	            gfp.scale = 1;

	        if (gfp.ATHtype < 0)
	            gfp.ATHtype = 4;

	        if (gfp.ATHcurve < 0)
	            gfp.ATHcurve = 4;

	        if (gfp.athaa_loudapprox < 0)
	            gfp.athaa_loudapprox = 2;

	        if (gfp.interChRatio < 0)
	            gfp.interChRatio = 0;

	        if (gfp.useTemporal == null)
	            gfp.useTemporal = true;
	        /* on by default */

	        /*
	         * padding method as described in
	         * "MPEG-Layer3 / Bitstream Syntax and Decoding" by Martin Sieler, Ralph
	         * Sperschneider
	         *
	         * note: there is no padding for the very first frame
	         *
	         * Robert Hegemann 2000-06-22
	         */
	        gfc.slot_lag = gfc.frac_SpF = 0;
	        if (gfp.VBR == VbrMode.vbr_off)
	            gfc.slot_lag = gfc.frac_SpF = (((gfp.version + 1) * 72000 * gfp.brate) % gfp.out_samplerate) | 0;

	        qupvt.iteration_init(gfp);
	        psy.psymodel_init(gfp);
	        return 0;
	    }
	    this.lame_encode_buffer = function (gfp, buffer_l, buffer_r, nsamples, mp3buf, mp3bufPos, mp3buf_size) {
	    function lame_encode_buffer_sample(gfp, buffer_l, buffer_r, nsamples, mp3buf, mp3bufPos, mp3buf_size) {
	        var gfc = gfp.internal_flags;
	        var mp3size = 0, ret, i, ch, mf_needed;
	        var mp3out;
	        var mfbuf = [null, null];
	        var in_buffer = [null, null];

	        if (gfc.Class_ID != LAME_ID)
	            return -3;

	        if (nsamples == 0)
	            return 0;

	        /* copy out any tags that may have been written into bitstream */
	        mp3out = bs.copy_buffer(gfc, mp3buf, mp3bufPos, mp3buf_size, 0);
	        if (mp3out < 0)
	            return mp3out;
	        /* not enough buffer space */
	        mp3bufPos += mp3out;
	        mp3size += mp3out;

	        in_buffer[0] = buffer_l;
	        in_buffer[1] = buffer_r;

	        /* Apply user defined re-scaling */

	        /* user selected scaling of the samples */
	        if (BitStream.NEQ(gfp.scale, 0) && BitStream.NEQ(gfp.scale, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale;
	                if (gfc.channels_out == 2)
	                    in_buffer[1][i] *= gfp.scale;
	            }
	        }

	        /* user selected scaling of the channel 0 (left) samples */
	        if (BitStream.NEQ(gfp.scale_left, 0)
	            && BitStream.NEQ(gfp.scale_left, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale_left;
	            }
	        }

	        /* user selected scaling of the channel 1 (right) samples */
	        if (BitStream.NEQ(gfp.scale_right, 0)
	            && BitStream.NEQ(gfp.scale_right, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[1][i] *= gfp.scale_right;
	            }
	        }

	        /* Downsample to Mono if 2 channels in and 1 channel out */
	        if (gfp.num_channels == 2 && gfc.channels_out == 1) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] = 0.5 * ( in_buffer[0][i] + in_buffer[1][i]);
	                in_buffer[1][i] = 0.0;
	            }
	        }

	        mf_needed = calcNeeded(gfp);

	        mfbuf[0] = gfc.mfbuf[0];
	        mfbuf[1] = gfc.mfbuf[1];

	        var in_bufferPos = 0;
	        while (nsamples > 0) {
	            var in_buffer_ptr = [null, null];
	            var n_in = 0;
	            /* number of input samples processed with fill_buffer */
	            var n_out = 0;
	            /* number of samples output with fill_buffer */
	            /* n_in <> n_out if we are resampling */

	            in_buffer_ptr[0] = in_buffer[0];
	            in_buffer_ptr[1] = in_buffer[1];
	            /* copy in new samples into mfbuf, with resampling */
	            var inOut = new InOut();
	            fill_buffer(gfp, mfbuf, in_buffer_ptr, in_bufferPos, nsamples,
	                inOut);
	            n_in = inOut.n_in;
	            n_out = inOut.n_out;

	            /* compute ReplayGain of resampled input if requested */
	            if (gfc.findReplayGain && !gfc.decode_on_the_fly)
	                if (ga.AnalyzeSamples(gfc.rgdata, mfbuf[0], gfc.mf_size,
	                        mfbuf[1], gfc.mf_size, n_out, gfc.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR)
	                    return -6;

	            /* update in_buffer counters */
	            nsamples -= n_in;
	            in_bufferPos += n_in;
	            if (gfc.channels_out == 2)
	                ;// in_bufferPos += n_in;

	            /* update mfbuf[] counters */
	            gfc.mf_size += n_out;

	            /*
	             * lame_encode_flush may have set gfc.mf_sample_to_encode to 0 so we
	             * have to reinitialize it here when that happened.
	             */
	            if (gfc.mf_samples_to_encode < 1) {
	                gfc.mf_samples_to_encode = Encoder.ENCDELAY + Encoder.POSTDELAY;
	            }
	            gfc.mf_samples_to_encode += n_out;

	            if (gfc.mf_size >= mf_needed) {
	                /* encode the frame. */
	                /* mp3buf = pointer to current location in buffer */
	                /* mp3buf_size = size of original mp3 output buffer */
	                /* = 0 if we should not worry about the */
	                /* buffer size because calling program is */
	                /* to lazy to compute it */
	                /* mp3size = size of data written to buffer so far */
	                /* mp3buf_size-mp3size = amount of space avalable */

	                var buf_size = mp3buf_size - mp3size;
	                if (mp3buf_size == 0)
	                    buf_size = 0;

	                ret = lame_encode_frame(gfp, mfbuf[0], mfbuf[1], mp3buf,
	                    mp3bufPos, buf_size);

	                if (ret < 0)
	                    return ret;
	                mp3bufPos += ret;
	                mp3size += ret;

	                /* shift out old samples */
	                gfc.mf_size -= gfp.framesize;
	                gfc.mf_samples_to_encode -= gfp.framesize;
	                for (ch = 0; ch < gfc.channels_out; ch++)
	                    for (i = 0; i < gfc.mf_size; i++)
	                        mfbuf[ch][i] = mfbuf[ch][i + gfp.framesize];
	            }
	        }

	        return mp3size;
	    }
	    function lame_encode_frame(gfp, inbuf_l, inbuf_r, mp3buf, mp3bufPos, mp3buf_size) {
	    function fill_buffer_resample(gfp, outbuf, outbufPos, desired_len, inbuf, in_bufferPos, len, num_used, ch) {
	    function fill_buffer(gfp, mfbuf, in_buffer, in_bufferPos, nsamples, io) {