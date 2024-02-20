async function findOpenSocket() {
  let currentSocket = 1;
  console.log('checking', currentSocket);
  while (await isSocketTaken('myapp' + currentSocket)) {
    currentSocket++;
    console.log('checking', currentSocket);
  }
  console.log('found socket', currentSocket);
  return 'myapp' + currentSocket;
}