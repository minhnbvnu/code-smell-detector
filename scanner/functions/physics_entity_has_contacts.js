function physics_entity_has_contacts(physics, entity, region, normal, mask, sensors) {
    return $physics_entity_contacts(physics, entity, region, normal, mask, sensors, true);
}