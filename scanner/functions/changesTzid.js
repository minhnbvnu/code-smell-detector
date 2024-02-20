function changesTzid(newTzid) {
          assert.notEqual(
            timeProp.getFirstValue().zone.tzid,
            changeTime.zone.tzid,
            'zones are different'
          );

          subject[prop] = changeTime;
          assert.equal(
            newTzid,
            timeProp.getParameter('tzid'),
            'removes timezone id'
          );
        }