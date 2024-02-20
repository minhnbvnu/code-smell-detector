function hookIndicesToString(indices) {
  // This is debatable but I think 1-based might ake for a nicer UX.
  const numbers = indices.map(value => value + 1);

  switch (numbers.length) {
    case 0:
      return 'No hooks changed';

    case 1:
      return `Hook ${numbers[0]} changed`;

    case 2:
      return `Hooks ${numbers[0]} and ${numbers[1]} changed`;

    default:
      return `Hooks ${numbers.slice(0, numbers.length - 1).join(', ')} and ${numbers[numbers.length - 1]} changed`;
  }
}