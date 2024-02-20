function updateTimezones(vcal) {
  let allsubs, properties, vtimezones, reqTzid, i;

  if (!vcal || vcal.name !== "vcalendar") {
    //not a top-level vcalendar component
    return vcal;
  }

  //Store vtimezone subcomponents in an object reference by tzid.
  //Store properties from everything else in another array
  allsubs = vcal.getAllSubcomponents();
  properties = [];
  vtimezones = {};
  for (i = 0; i < allsubs.length; i++) {
    if (allsubs[i].name === "vtimezone") {
      let tzid = allsubs[i].getFirstProperty("tzid").getFirstValue();
      vtimezones[tzid] = allsubs[i];
    } else {
      properties = properties.concat(allsubs[i].getAllProperties());
    }
  }

  //create an object with one entry for each required tz
  reqTzid = {};
  for (i = 0; i < properties.length; i++) {
    let tzid = properties[i].getParameter("tzid");
    if (tzid) {
      reqTzid[tzid] = true;
    }
  }

  //delete any vtimezones that are not on the reqTzid list.
  for (let [tzid, comp] of Object.entries(vtimezones)) {
    if (!reqTzid[tzid]) {
      vcal.removeSubcomponent(comp);
    }
  }

  //create any missing, but registered timezones
  for (let tzid of Object.keys(reqTzid)) {
    if (!vtimezones[tzid] && TimezoneService.has(tzid)) {
      vcal.addSubcomponent(TimezoneService.get(tzid).component);
    }
  }

  return vcal;
}