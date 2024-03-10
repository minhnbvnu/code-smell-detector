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