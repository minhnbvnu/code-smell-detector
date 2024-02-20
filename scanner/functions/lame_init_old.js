function lame_init_old(gfp) {
	        var gfc;

	        gfp.class_id = LAME_ID;

	        gfc = gfp.internal_flags = new LameInternalFlags();

	        /* Global flags. set defaults here for non-zero values */
	        /* see lame.h for description */
	        /*
	         * set integer values to -1 to mean that LAME will compute the best
	         * value, UNLESS the calling program as set it (and the value is no
	         * longer -1)
	         */

	        gfp.mode = MPEGMode.NOT_SET;
	        gfp.original = 1;
	        gfp.in_samplerate = 44100;
	        gfp.num_channels = 2;
	        gfp.num_samples = -1;

	        gfp.bWriteVbrTag = true;
	        gfp.quality = -1;
	        gfp.short_blocks = null;
	        gfc.subblock_gain = -1;

	        gfp.lowpassfreq = 0;
	        gfp.highpassfreq = 0;
	        gfp.lowpasswidth = -1;
	        gfp.highpasswidth = -1;

	        gfp.VBR = VbrMode.vbr_off;
	        gfp.VBR_q = 4;
	        gfp.ATHcurve = -1;
	        gfp.VBR_mean_bitrate_kbps = 128;
	        gfp.VBR_min_bitrate_kbps = 0;
	        gfp.VBR_max_bitrate_kbps = 0;
	        gfp.VBR_hard_min = 0;
	        gfc.VBR_min_bitrate = 1;
	        /* not 0 ????? */
	        gfc.VBR_max_bitrate = 13;
	        /* not 14 ????? */

	        gfp.quant_comp = -1;
	        gfp.quant_comp_short = -1;

	        gfp.msfix = -1;

	        gfc.resample_ratio = 1;

	        gfc.OldValue[0] = 180;
	        gfc.OldValue[1] = 180;
	        gfc.CurrentStep[0] = 4;
	        gfc.CurrentStep[1] = 4;
	        gfc.masking_lower = 1;
	        gfc.nsPsy.attackthre = -1;
	        gfc.nsPsy.attackthre_s = -1;

	        gfp.scale = -1;

	        gfp.athaa_type = -1;
	        gfp.ATHtype = -1;
	        /* default = -1 = set in lame_init_params */
	        gfp.athaa_loudapprox = -1;
	        /* 1 = flat loudness approx. (total energy) */
	        /* 2 = equal loudness curve */
	        gfp.athaa_sensitivity = 0.0;
	        /* no offset */
	        gfp.useTemporal = null;
	        gfp.interChRatio = -1;

	        /*
	         * The reason for int mf_samples_to_encode = ENCDELAY + POSTDELAY;
	         * ENCDELAY = internal encoder delay. And then we have to add
	         * POSTDELAY=288 because of the 50% MDCT overlap. A 576 MDCT granule
	         * decodes to 1152 samples. To synthesize the 576 samples centered under
	         * this granule we need the previous granule for the first 288 samples
	         * (no problem), and the next granule for the next 288 samples (not
	         * possible if this is last granule). So we need to pad with 288 samples
	         * to make sure we can encode the 576 samples we are interested in.
	         */
	        gfc.mf_samples_to_encode = Encoder.ENCDELAY + Encoder.POSTDELAY;
	        gfp.encoder_padding = 0;
	        gfc.mf_size = Encoder.ENCDELAY - Encoder.MDCTDELAY;
	        /*
	         * we pad input with this many 0's
	         */

	        gfp.findReplayGain = false;
	        gfp.decode_on_the_fly = false;

	        gfc.decode_on_the_fly = false;
	        gfc.findReplayGain = false;
	        gfc.findPeakSample = false;

	        gfc.RadioGain = 0;
	        gfc.AudiophileGain = 0;
	        gfc.noclipGainChange = 0;
	        gfc.noclipScale = -1.0;

	        gfp.preset = 0;

	        gfp.write_id3tag_automatic = true;
	        return 0;
	    }