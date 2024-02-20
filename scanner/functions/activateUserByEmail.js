function activateUserByEmail(email) {
  return db.user_activations.update({
    activation_status: 1,
  }, {
    include: [
      {
        model: db.user_details,
        on: `user_activations.id = user_details.user_activation_id AND user_details.email = ${email}`,
      },
    ],
    where: {},
  });
}