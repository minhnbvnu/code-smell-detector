function cleanInitialState(){
  assert(pathExists('./coverage') === false, 'should start without: coverage');
  assert(pathExists('./coverage.json') === false, 'should start without: coverage.json');
}