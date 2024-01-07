function generate_versions(context) {
  let all_versions = versions.versions;
  unique_versions = [...new Set(all_versions)]

  const version_map = getVersionMap(unique_versions);

  const data = {
      major_release: []
  };

  for (const major_version of version_map.entries()) {
      const temp = {"version" : major_version[0]};
      temp["minor_release"] = [];
      const sorted = sortSoftwareVersions(major_version[1], "minor");
      for (let i = 0, len = sorted.length; i < len; i++) {
          
          // sorted[i] represent the minor version and its object contains the version and the link
          const temp_minor = {};
          temp_minor["minor_ver"] = major_version[0].concat(sorted[i]);
          temp_minor["link"] = getMilestoneLink(temp_minor["minor_ver"]);
          
          temp["minor_release"].push(temp_minor);
      }
      //  console.log(temp);
      data.major_release.push(temp);
  };

  let sortedRelease = sortSoftwareVersions(data.major_release, "major");
  
  context["major_release"] = sortedRelease;
}