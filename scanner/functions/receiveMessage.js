function receiveMessage(event) {
  otpInput.value = event.data.digits;
  otpInput.setAttribute("size", event.data.digits.length);
  otpLabel.innerText = (event.data.label || "OTP") + ":";
  var message = {
    action: "resize",
    payload: {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  };
  window.parent.postMessage(message, "*");
}