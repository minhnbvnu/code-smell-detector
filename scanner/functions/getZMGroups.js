function getZMGroups() {
        //{"groups":[{"Group":{"Id":"1","Name":"test","ParentId":null}},{"Group":{"Id":"2","Name":"test2","ParentId":null}}]}
        var d = $q.defer();
        zmgroups = [];

        if (get_unsupported('groups_associations')) {
          debug ('Groups Association API is marked as unsupported, not invoking');
          d.resolve(true);
          return d.promise;
        }

        var apiurl = loginData.apiurl+'/groups/associations.json?'+$rootScope.authSession;

        for (var m=0; m < monitors.length; m++ ) {
          if (!monitors[m].Monitor.Group) monitors[m].Monitor.Group=[];
        }

        cache_or_http(apiurl, 'cached_zmgroups')
        .then (function (data) {
          data = data.data;
//          console.log (JSON.stringify(data));

          //debug ('Groups are:'+JSON.stringify(data));
          if (data && data.groups) {
            zmgroups = [];
            for (var i=0; i< data.groups.length; i++) {
              zmgroups.push(data.groups[i].Group.Name);
              //console.log( "Checking Group "+data.groups[i].Group.Name);
             for (var j=0; j < data.groups[i].Monitor.length; j++) {
               for (var k = 0; k < monitors.length; k++) {
                // console.log(k);
                 if (monitors[k].Monitor.Id == data.groups[i].Monitor[j].Id) {
                  monitors[k].Monitor.Group.push({'id':data.groups[i].Group.Id, 'name':data.groups[i].Group.Name});

                  var parent = data.groups[i].Group.ParentId;
                  while (parent) {
                    var parentFound = false;
                    var x;
                    for (x = 0; x < data.groups.length; x++) {
                      if (data.groups[x].Group.Id == parent) {
                        parentFound = true;
                        break;
                      }
                    }
                    if (parentFound) {
                      monitors[k].Monitor.Group.push({'id':data.groups[x].Group.Id, 'name':data.groups[x].Group.Name});
                    //  console.log (data.groups[x].Group.Id+ " is parent of "+data.groups[i].Group.Id);
                      parent = data.groups[x].Group.ParentId;
                    }
                  }

                //  console.log ('DONE HIERARCHY');
                 // console.log ('Monitor: '+ monitors[k].Monitor.Name+" belongs to Group:"+data.groups[i].Group.Name);
                 }
               } // monitors
             } // groups monitors
            } // groups
            d.resolve(true);
            return (d.promise);
          } else {
            debug('No groups found');
            d.resolve(true);
            return (d.promise);
          }
        }, function (err) {
          debug('Error retrieving groups:'+JSON.stringify(err));
          set_unsupported('groups_associations');
          d.resolve(true);
          return (d.promise);
        });
        return (d.promise);
      }