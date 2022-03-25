const $ = x => document.querySelector("[data-id=\"" + captcha_id + "\"] " + x)

// check that JS is enabled
$('.speakcaptcha-image').style.display = 'flex'
$('.speakcaptcha-text-js').style.display = 'none'
$('.speakcaptcha-text-info').style.display = 'block'
$('.speakcaptcha-text-nosupport').style.display = 'none'

// check that webrtc is supported
if (!("mediaDevices" in navigator)) {
  $('.speakcaptcha-image').style.display = 'none'
  $('.speakcaptcha-text-js').style.display = 'none'
  $('.speakcaptcha-text-info').style.display = 'none'
  $('.speakcaptcha-text-nosupport').style.display = 'block'
}

const icons = {
  "micOff": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" stroke-width="1.5"/>
<path d="M5 10V11C5 14.866 8.13401 18 12 18V18V18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V22M12 22H9M12 22H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "micOn": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" stroke-width="1.5"/>
<path d="M5 3V5M1 2V6M19 3V5M23 2V6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 10V11C5 14.866 8.13401 18 12 18V18V18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V22M12 22H9M12 22H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "playOff": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "playOn": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14V10C2 9.44772 2.44772 9 3 9H5.69722C5.89465 9 6.08766 8.94156 6.25192 8.83205L10.4453 6.03647C11.1099 5.59343 12 6.06982 12 6.86852V17.1315C12 17.9302 11.1099 18.4066 10.4453 17.9635L6.25192 15.1679C6.08766 15.0584 5.89465 15 5.69722 15H3C2.44772 15 2 14.5523 2 14Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M16.5 7.5C16.5 7.5 18 9 18 11.5C18 14 16.5 15.5 16.5 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.5 4.5C19.5 4.5 22 7 22 11.5C22 16 19.5 18.5 19.5 18.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
}

class SpeakCaptcha {
  stream = null
  recorder = null
  blobs = []
  recorded = null

  constructor(id) {
    this.id = id
  }

  newCaptcha() {
    const url = new URL(window.location)
    url.searchParams.set("from_id", this.id)
    window.history.replaceState(null, "", url.toString())
    window.location.reload()
  }

  listen() {
    if (!this.stream || !this.recorder) {
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop())
        this.stream = null
      }
      if (this.recorder) {
        if (this.recorder.state !== "inactive") this.recorder.stop()
        this.recorder = null
      }
      $(".speakcaptcha-audio").style.display = "none";
      this.recorded = null
      navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        $(".speakcaptcha-button-microphone").innerHTML = icons.micOn
        $(".speakcaptcha-button-microphone").title = "Stop recording answer"
        $(".speakcaptcha-button-microphone")["aria-label"] = "Stop recording answer"
        console.log(stream)
        this.stream = stream

        this.blobs = [];
        this.recorder = new MediaRecorder(stream)
        this.recorder.addEventListener("dataavailable", e => {
          this.blobs.push(e.data)
        })
        this.recorder.addEventListener("stop", e => {
          const blob = new Blob(this.blobs, {type: this.recorder.mimeType})
          console.info(`[SPEAKCAPTCHA ${this.id}] Stopped recording`)
          this.recorded = blob
          this.recorder = null
          $(".speakcaptcha-audio").style.display = "block";
        })
        this.recorder.start()
        console.info(`[SPEAKCAPTCHA ${this.id}] Started recording`)
      }).catch(e => {
        switch (e.name.toLowerCase()) {
          case "aborterror":
          case "notreadableerror":
          case "securityerror":
            alert("An error occured while fetching your microphone. Make sure it is plugged in, and your browser has permission to use it.")
            break
          case "notfounderror":
            alert("Your microphone is not available. Make sure it is plugged in, and your browser has permission to use it.")
            break
          case "notallowederror":
            alert("Your browser does not allow you to use your microphone. Make sure you have enabled it in your browser settings.")
            break
          default:
            alert("An error occured while fetching your microphone. Make sure it is plugged in, and your browser has permission to use it.")
            break
        }
      })
    } else {
      $(".speakcaptcha-button-microphone").innerHTML = icons.micOff
      $(".speakcaptcha-button-microphone").title = "Record captcha answer"
      $(".speakcaptcha-button-microphone")["aria-label"] = "Record captcha answer"

      if (this.recorder) {
        if (this.recorder.state !== "inactive") {
          this.recorder.stop()
        }
      }

      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop())
        this.stream = null
      }
    }
  }

  submit() {
    if (!this.recorded) {
      window.alert("Please record your answer by pressing the mic button first.")
      return
    }
  }

  playRecording() {
    if (!this.recorded) {
      window.alert("Please record your answer by pressing the mic button first.")
      $(".speakcaptcha-audio").style.display = "none";
      return
    }
    const reader = new FileReader()
    reader.onload = e => {
      const audio = new Audio(e.target.result)
      audio.play()
      $(".speakcaptcha-button-play").disabled = true;
      $(".speakcaptcha-button-play").innerHTML = `${icons.playOn} Playing`;
      audio.onended = () => {
        $(".speakcaptcha-button-play").disabled = false;
        $(".speakcaptcha-button-play").innerHTML = `${icons.playOff} Play your recording`;
      }
    }
    reader.readAsDataURL(this.recorded)
  }
}

window[captcha_id] = new SpeakCaptcha(captcha_id)
