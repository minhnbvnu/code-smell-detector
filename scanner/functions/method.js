function method(t, inst, fname, args) {
  t.type(inst[fname], 'function', fmt('instance has callable .%s()', fname));
  t.equal(inst[fname] && inst[fname].length, args.length,
          fmt('instance .%s() expects %d arguments (%s)',
                fname, args.length, args.join(', ')));
}