function LMinitSymbols() {
  LMsymbols.sort(compareNames);
  for (i=0; i<LMsymbols.length; i++) LMnames[i] = LMsymbols[i].input;
}