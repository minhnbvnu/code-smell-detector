async function AskUserShowPasswords() {
  let dummy = { value: false };

  // Confirm the user wants to display passwords
  return (
    Services.prompt.confirmEx(
      window,
      null,
      "Are you sure you wish to show your passwords?",
      Services.prompt.STD_YES_NO_BUTTONS,
      null,
      null,
      null,
      null,
      dummy
    ) == 0
  ); // 0=="Yes" button
}