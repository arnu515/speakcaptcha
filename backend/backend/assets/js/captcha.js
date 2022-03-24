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

const micIcons = {
  "off": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" stroke-width="1.5"/>
<path d="M5 10V11C5 14.866 8.13401 18 12 18V18V18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V22M12 22H9M12 22H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  "on": `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" stroke-width="1.5"/>
<path d="M5 3V5M1 2V6M19 3V5M23 2V6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 10V11C5 14.866 8.13401 18 12 18V18V18C15.866 18 19 14.866 19 11V10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18V22M12 22H9M12 22H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
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
        $(".speakcaptcha-button-microphone").innerHTML = micIcons.on
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
      $(".speakcaptcha-button-microphone").innerHTML = micIcons.off
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
    }
    reader.readAsDataURL(this.recorded)
  }
}

window[captcha_id] = new SpeakCaptcha(captcha_id)
