function allEquals (be1, be2, samples, assertion) {
  if (!assertion) assertion = assertClose;
  for (var i=0; i<=samples; ++i) {
    var x = i / samples;
    assertion(be1(x), be2(x), 'comparing '+be1+' and '+be2+' for value '+x);
  }
}