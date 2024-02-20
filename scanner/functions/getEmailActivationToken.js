function getEmailActivationToken(email) {
  return db.user_details.findOne({
    attributes: ['Activations.email_validate_token'],
    where: {
      email,
    },
    include: [{
      model: db.user_activations,
      as: 'Activations',
      attributes: [],
    }],
    raw: true,
  });
}