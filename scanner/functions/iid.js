function iid(instance, id) {
  if (id)
    return fmt('svc %d.%d', instance, id);
  return fmt('svc %d.%d', instance.serverServiceId, instance.id);
}