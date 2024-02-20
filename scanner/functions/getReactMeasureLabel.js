function getReactMeasureLabel(type) {
  switch (type) {
    case 'commit':
      return 'react commit';

    case 'render-idle':
      return 'react idle';

    case 'render':
      return 'react render';

    case 'layout-effects':
      return 'react layout effects';

    case 'passive-effects':
      return 'react passive effects';

    default:
      return null;
  }
}