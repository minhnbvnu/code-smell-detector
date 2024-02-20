function proxyFind(res, cookie,addr){
    /*var cookie = {
      'USERID' : 'jibimily@yahoo.com.cn',
      'BDUSS' : '3V4MC16WjFRRkpCS09HU2xzeUxjd25rbUk5bXJrUGhUbUg1N055cEVmYlllWTlSQUFBQUFBJCQAAAAAAAAAAAouTyDhc4IuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAYIArMAAAALBGZXYAAAAA6p5DAAAAAAAxMC4zNi4xNNgrolDYK6JQR'
      };*/

    //cookie = query.stringify(cookie,';');

    var myopt = makeOption(addr, cookie);
    console.log('---make option----');
    console.log(myopt);
    pcsGet(myopt,res);
}