function Alea(seed) {
	      var me = this,
	          mash = Mash();

	      me.next = function () {
	        var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32

	        me.s0 = me.s1;
	        me.s1 = me.s2;
	        return me.s2 = t - (me.c = t | 0);
	      }; // Apply the seeding algorithm from Baagoe.


	      me.c = 1;
	      me.s0 = mash(' ');
	      me.s1 = mash(' ');
	      me.s2 = mash(' ');
	      me.s0 -= mash(seed);

	      if (me.s0 < 0) {
	        me.s0 += 1;
	      }

	      me.s1 -= mash(seed);

	      if (me.s1 < 0) {
	        me.s1 += 1;
	      }

	      me.s2 -= mash(seed);

	      if (me.s2 < 0) {
	        me.s2 += 1;
	      }

	      mash = null;
	    }