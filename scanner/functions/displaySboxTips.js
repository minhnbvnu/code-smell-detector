function displaySboxTips(runtime) {
  console.log(yellow(`\nWelcom to fun sbox environment.\n`));
  console.log(yellow(`You can install system dependencies like this:`));
  console.log(yellow(`fun-install apt-get install libxss1\n`));

  switch (runtime) {
  case 'nodejs6':
  case 'nodejs8':
  case 'nodejs10':
  case 'nodejs12':
    console.log(yellow(`You can install node modules like this:`));
    console.log(yellow(`fun-install npm install puppeteer\n`));
    break;
  case 'python2.7':
  case 'python3':
    console.log(yellow(`You can install pip dependencies like this:`));
    console.log(yellow(`fun-install pip install flask`));
    break;
  default:
    break;
  }
  console.log(yellow('type \'fun-install --help\' for more help\n'));
}