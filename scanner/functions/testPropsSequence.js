function testPropsSequence(sequence) {
  testPropsSequenceWithPreparedChildren(sequence, prepareChildrenArray);
  testPropsSequenceWithPreparedChildren(
    sequence,
    prepareChildrenLegacyIterable,
  );
  testPropsSequenceWithPreparedChildren(
    sequence,
    prepareChildrenModernIterable,
  );
}