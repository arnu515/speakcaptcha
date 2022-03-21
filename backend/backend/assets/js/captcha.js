class SpeakCaptcha {
  static newCaptcha() {
    const url = new URL(window.location)
    url.searchParams.set("from_id", captcha_id)
    window.history.replaceState(null, "", url.toString())
    window.location.reload()
  }
}

window[captcha_id] = SpeakCaptcha
