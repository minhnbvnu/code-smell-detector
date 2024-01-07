function clusterMemberStyle(clusterMember) {
  return new Style({
    geometry: clusterMember.getGeometry(),
    image: clusterMember.get('LEISTUNG') > 5 ? darkIcon : lightIcon,
  });
}