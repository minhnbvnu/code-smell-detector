function putLameVBR(gfp, musicLength, streamBuffer, streamBufferPos, crc) {
	        var gfc = gfp.internal_flags;
	        var bytesWritten = 0;

	        /* encoder delay */
	        var encDelay = gfp.encoder_delay;
	        /* encoder padding */
	        var encPadding = gfp.encoder_padding;

	        /* recall: gfp.VBR_q is for example set by the switch -V */
	        /* gfp.quality by -q, -h, -f, etc */
	        var quality = (100 - 10 * gfp.VBR_q - gfp.quality);

	        var version = v.getLameVeryShortVersion();
	        var vbr;
	        var revision = 0x00;
	        var revMethod;
	        // numbering different in vbr_mode vs. Lame tag
	        var vbrTypeTranslator = [1, 5, 3, 2, 4, 0, 3];
	        var lowpass = 0 | (((gfp.lowpassfreq / 100.0) + .5) > 255 ? 255
	                : (gfp.lowpassfreq / 100.0) + .5);
	        var peakSignalAmplitude = 0;
	        var radioReplayGain = 0;
	        var audiophileReplayGain = 0;
	        var noiseShaping = gfp.internal_flags.noise_shaping;
	        var stereoMode = 0;
	        var nonOptimal = 0;
	        var sourceFreq = 0;
	        var misc = 0;
	        var musicCRC = 0;

	        // psy model type: Gpsycho or NsPsytune
	        var expNPsyTune = (gfp.exp_nspsytune & 1) != 0;
	        var safeJoint = (gfp.exp_nspsytune & 2) != 0;
	        var noGapMore = false;
	        var noGapPrevious = false;
	        var noGapCount = gfp.internal_flags.nogap_total;
	        var noGapCurr = gfp.internal_flags.nogap_current;

	        // 4 bits
	        var athType = gfp.ATHtype;
	        var flags = 0;

	        // vbr modes
	        var abrBitrate;
	        switch (gfp.VBR) {
	            case vbr_abr:
	                abrBitrate = gfp.VBR_mean_bitrate_kbps;
	                break;
	            case vbr_off:
	                abrBitrate = gfp.brate;
	                break;
	            default:
	                abrBitrate = gfp.VBR_min_bitrate_kbps;
	        }

	        // revision and vbr method
	        if (gfp.VBR.ordinal() < vbrTypeTranslator.length)
	            vbr = vbrTypeTranslator[gfp.VBR.ordinal()];
	        else
	            vbr = 0x00; // unknown

	        revMethod = 0x10 * revision + vbr;

	        // ReplayGain
	        if (gfc.findReplayGain) {
	            if (gfc.RadioGain > 0x1FE)
	                gfc.RadioGain = 0x1FE;
	            if (gfc.RadioGain < -0x1FE)
	                gfc.RadioGain = -0x1FE;

	            // set name code
	            radioReplayGain = 0x2000;
	            // set originator code to `determined automatically'
	            radioReplayGain |= 0xC00;

	            if (gfc.RadioGain >= 0) {
	                // set gain adjustment
	                radioReplayGain |= gfc.RadioGain;
	            } else {
	                // set the sign bit
	                radioReplayGain |= 0x200;
	                // set gain adjustment
	                radioReplayGain |= -gfc.RadioGain;
	            }
	        }

	        // peak sample
	        if (gfc.findPeakSample)
	            peakSignalAmplitude = Math
	                .abs(0 | ((( gfc.PeakSample) / 32767.0) * Math.pow(2, 23) + .5));

	        // nogap
	        if (noGapCount != -1) {
	            if (noGapCurr > 0)
	                noGapPrevious = true;

	            if (noGapCurr < noGapCount - 1)
	                noGapMore = true;
	        }

	        // flags
	        flags = athType + ((expNPsyTune ? 1 : 0) << 4)
	            + ((safeJoint ? 1 : 0) << 5) + ((noGapMore ? 1 : 0) << 6)
	            + ((noGapPrevious ? 1 : 0) << 7);

	        if (quality < 0)
	            quality = 0;

	        // stereo mode field (Intensity stereo is not implemented)
	        switch (gfp.mode) {
	            case MONO:
	                stereoMode = 0;
	                break;
	            case STEREO:
	                stereoMode = 1;
	                break;
	            case DUAL_CHANNEL:
	                stereoMode = 2;
	                break;
	            case JOINT_STEREO:
	                if (gfp.force_ms)
	                    stereoMode = 4;
	                else
	                    stereoMode = 3;
	                break;
	            case NOT_SET:
	            //$FALL-THROUGH$
	            default:
	                stereoMode = 7;
	                break;
	        }

	        if (gfp.in_samplerate <= 32000)
	            sourceFreq = 0x00;
	        else if (gfp.in_samplerate == 48000)
	            sourceFreq = 0x02;
	        else if (gfp.in_samplerate > 48000)
	            sourceFreq = 0x03;
	        else {
	            // default is 44100Hz
	            sourceFreq = 0x01;
	        }

	        // Check if the user overrided the default LAME behavior with some
	        // nasty options
	        if (gfp.short_blocks == ShortBlock.short_block_forced
	            || gfp.short_blocks == ShortBlock.short_block_dispensed
	            || ((gfp.lowpassfreq == -1) && (gfp.highpassfreq == -1)) || /* "-k" */
	            (gfp.scale_left < gfp.scale_right)
	            || (gfp.scale_left > gfp.scale_right)
	            || (gfp.disable_reservoir && gfp.brate < 320) || gfp.noATH
	            || gfp.ATHonly || (athType == 0) || gfp.in_samplerate <= 32000)
	            nonOptimal = 1;

	        misc = noiseShaping + (stereoMode << 2) + (nonOptimal << 5)
	            + (sourceFreq << 6);

	        musicCRC = gfc.nMusicCRC;

	        // Write all this information into the stream

	        createInteger(streamBuffer, streamBufferPos + bytesWritten, quality);
	        bytesWritten += 4;

	        for (var j = 0; j < 9; j++) {
	            streamBuffer[streamBufferPos + bytesWritten + j] = 0xff & version .charAt(j);
	        }
	        bytesWritten += 9;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & revMethod;
	        bytesWritten++;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & lowpass;
	        bytesWritten++;

	        createInteger(streamBuffer, streamBufferPos + bytesWritten,
	            peakSignalAmplitude);
	        bytesWritten += 4;

	        createShort(streamBuffer, streamBufferPos + bytesWritten,
	            radioReplayGain);
	        bytesWritten += 2;

	        createShort(streamBuffer, streamBufferPos + bytesWritten,
	            audiophileReplayGain);
	        bytesWritten += 2;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & flags;
	        bytesWritten++;

	        if (abrBitrate >= 255)
	            streamBuffer[streamBufferPos + bytesWritten] = 0xFF;
	        else
	            streamBuffer[streamBufferPos + bytesWritten] = 0xff & abrBitrate;
	        bytesWritten++;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & (encDelay >> 4);
	        streamBuffer[streamBufferPos + bytesWritten + 1] = 0xff & ((encDelay << 4) + (encPadding >> 8));
	        streamBuffer[streamBufferPos + bytesWritten + 2] = 0xff & encPadding;

	        bytesWritten += 3;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & misc;
	        bytesWritten++;

	        // unused in rev0
	        streamBuffer[streamBufferPos + bytesWritten++] = 0;

	        createShort(streamBuffer, streamBufferPos + bytesWritten, gfp.preset);
	        bytesWritten += 2;

	        createInteger(streamBuffer, streamBufferPos + bytesWritten, musicLength);
	        bytesWritten += 4;

	        createShort(streamBuffer, streamBufferPos + bytesWritten, musicCRC);
	        bytesWritten += 2;

	        // Calculate tag CRC.... must be done here, since it includes previous
	        // information

	        for (var i = 0; i < bytesWritten; i++)
	            crc = crcUpdateLookup(streamBuffer[streamBufferPos + i], crc);

	        createShort(streamBuffer, streamBufferPos + bytesWritten, crc);
	        bytesWritten += 2;

	        return bytesWritten;
	    }