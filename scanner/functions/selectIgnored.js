function selectIgnored(runtime) {
  switch (runtime) {
  case 'nodejs6':
  case 'nodejs8':
  case 'nodejs10':
  case 'nodejs12':

    return ['.fun/python'];
  case 'python2.7':
  case 'python3':

    return ['node_modules'];
  case 'php7.2':

    return ['node_modules', '.fun/python'];
  default:
    return [];
  }
}