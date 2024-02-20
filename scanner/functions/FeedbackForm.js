function FeedbackForm({ feature, children }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSent, setIsSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    fetch(`https://hooks.zapier.com/hooks/catch/1239764/oo73gyz/`, {
      method: 'POST',
      body: JSON.stringify({ email, comment, key: feature }),
    }).then(() => setIsSent(true));
  };
  const thankYouMessage = <p>Thank you for your input!</p>;
  const form = (
    <>
      {children}
      <form className={styles.feedbackForm}>
        <label htmlFor="comment">Your question or comment</label>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email (optional)</label> <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="will only be used to send you a reply"
          onChange={(e) => setEmail(e.target.value)}
        />{' '}
        <br />
        <button type="submit" onClick={submit}>
          Send it!
        </button>
        <br />
        <br />
      </form>
    </>
  );
  return <>{isSent ? thankYouMessage : form}</>;
}