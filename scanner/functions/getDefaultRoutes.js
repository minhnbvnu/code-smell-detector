function getDefaultRoutes() {
  var routes = wmi.InstancesOf('Win32_IP4RouteTable');
  var ageSum = 0;
  var count = 0;
  var defaults = [];
  for (var it = new Enumerator(routes); !it.atEnd(); it.moveNext()) {
    var item = it.item();
    if (item.Destination === '0.0.0.0') {
      ageSum += item.Age;
      count++;
      defaults.push(item);
    }
  }
  var ageAvg = ageSum / count;
  var defaultRoutes = {
    net: null,
    vpn: null
  };
  defaults.forEach(function(item) {
    if (item.age >= ageAvg)
      defaultRoutes.net = item;
    else
      defaultRoutes.vpn = item;
  });
  return defaultRoutes;
}