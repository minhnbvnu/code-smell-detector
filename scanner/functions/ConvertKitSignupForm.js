function ConvertKitSignupForm({
  children,
  buttonText,
  buttonStyle,
  signupText,
  formId = '915821',
  tags,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const clearError = () => {
    if (email !== '' && name !== '') {
      setErrorMessage('');
    }
  };

  const onSubmit = (e) => {
    if (email === '' || name === '') {
      setErrorMessage('Please no empty inputs');
      e.preventDefault();
    }
  };
  return (
    <div className={styles.signupFormArea}>
      <form
        onSubmit={onSubmit}
        method="post"
        action={`https://app.convertkit.com/forms/${formId}/subscriptions`}
      >
        {children}
        <div className={styles.signupFormValidationError}>{errorMessage}</div>
        <div>
          <input
            className={styles.signupField}
            onChange={(e) => {
              clearError();
              setEmail(e.target.value);
            }}
            style={
              errorMessage && email === '' ? { border: '1px solid red' } : {}
            }
            autoFocus
            placeholder="Your Email"
            name="email_address"
            type="email"
          />
        </div>
        <div>
          <input
            className={styles.signupField}
            onChange={(e) => {
              clearError();
              setName(e.target.value);
            }}
            style={
              errorMessage && name === '' ? { border: '1px solid red' } : {}
            }
            name="first_name"
            placeholder="Your Name"
          />
        </div>
        {tags ? (
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        ) : (
          <div />
        )}
        <input type="hidden" name="api_key" value="qEqWamI6-oY7MOPZSU7qfw" />
        <div className={styles.signupButtonArea}>
          <input
            className={buttonStyle || styles.myButton}
            type="submit"
            value={buttonText || 'Send Me Lesson 1'}
          />
          <br />
          {signupText}
        </div>
      </form>
    </div>
  );
}