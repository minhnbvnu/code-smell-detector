function _xrecover(t){var n=t.sqr(),e=n.minus(_ONE).divide(_ONE.plus(_D.times(n))),i=e.pow(_RECOVERY_EXPONENT);return i.times(i).minus(e).equals(_ZERO)||(i=i.times(_I)),i.isOdd()&&(i=_Q.minus(i)),i}