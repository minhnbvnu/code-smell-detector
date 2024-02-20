function initPinBox() {
  document.querySelector(".pin-prompt form").addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      const pin = encodeURIComponent(this.pin.value);
      const encodedSecret = encodeURIComponent(SECRET);
      const btn = this.btn;
      btn.disabled = true;

      fetch(
        `${document.location.pathname}?__debugger__=yes&cmd=pinauth&pin=${pin}&s=${encodedSecret}`
      )
        .then((res) => res.json())
        .then(({auth, exhausted}) => {
          if (auth) {
            EVALEX_TRUSTED = true;
            fadeOut(document.getElementsByClassName("pin-prompt")[0]);
          } else {
            alert(
              `Error: ${
                exhausted
                  ? "too many attempts.  Restart server to retry."
                  : "incorrect pin"
              }`
            );
          }
        })
        .catch((err) => {
          alert("Error: Could not verify PIN.  Network error?");
          console.error(err);
        })
        .finally(() => (btn.disabled = false));
    },
    false
  );
}