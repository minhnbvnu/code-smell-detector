function ATHformula_GB(f, value) {
	        /**
	         * <PRE>
	         *  from Painter & Spanias
	         *           modified by Gabriel Bouvigne to better fit the reality
	         *           ath =    3.640 * pow(f,-0.8)
	         *           - 6.800 * exp(-0.6*pow(f-3.4,2.0))
	         *           + 6.000 * exp(-0.15*pow(f-8.7,2.0))
	         *           + 0.6* 0.001 * pow(f,4.0);
	         *
	         *
	         *           In the past LAME was using the Painter &Spanias formula.
	         *           But we had some recurrent problems with HF content.
	         *           We measured real ATH values, and found the older formula
	         *           to be inaccurate in the higher part. So we made this new
	         *           formula and this solved most of HF problematic test cases.
	         *           The tradeoff is that in VBR mode it increases a lot the
	         *           bitrate.
	         * </PRE>
	         */

	        /*
	         * This curve can be adjusted according to the VBR scale: it adjusts
	         * from something close to Painter & Spanias on V9 up to Bouvigne's
	         * formula for V0. This way the VBR bitrate is more balanced according
	         * to the -V value.
	         */

	        // the following Hack allows to ask for the lowest value
	        if (f < -.3)
	            f = 3410;

	        // convert to khz
	        f /= 1000;
	        f = Math.max(0.1, f);
	        var ath = 3.640 * Math.pow(f, -0.8) - 6.800
	            * Math.exp(-0.6 * Math.pow(f - 3.4, 2.0)) + 6.000
	            * Math.exp(-0.15 * Math.pow(f - 8.7, 2.0))
	            + (0.6 + 0.04 * value) * 0.001 * Math.pow(f, 4.0);
	        return ath;
	    }