function shouldEnforceSSL() {
  const enforceSSL = process.env.ENFORCE_SSL || "false";

  return enforceSSL === "true";
}