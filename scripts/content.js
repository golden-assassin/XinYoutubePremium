if (location.host === "www.youtube.com") {
  let video;
  let permit = true;
  let retry = 0;
  const MAX_RETRY = 5;

  function handle() {
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-overlay-close-button");
    const adText = document.querySelector(".ytp-ad-text, .ytp-ad-preview-text");
    if (skipButton || adText) {
      video.currentTime = video.duration;
      if (skipButton) {
        skipButton.click();
      }
    }
  }
  function input(event) {
    if (event.key === 'A' && permit) {
      togglePictureInPicture();
    } else if (event.key === 'R') {
      permit = !permit;
    }
  }
  window.addEventListener('keydown', input);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('keydown', input);
  });

  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  }

  function addPictureInPictureButton() {
    const controls = document.querySelector(".ytp-right-controls");
    if (controls) {
      const button = document.createElement('button');
      button.innerHTML = 'PiP';
      button.style.cssText = `height:55%;opacity:0.9;display:inline-block;width:48px;padding:0px 2px;overflow:hidden;position:relative;top:-20px;background:transparent;border:1px solid #fff;color:#fff;border-radius:100vh;`;
      button.addEventListener('click', togglePictureInPicture);
      controls.appendChild(button);
    } else if (retry < MAX_RETRY) {
      retry++;
      setTimeout(addPictureInPictureButton, 1000);
    }
  }

  function waitForVideoPageLoad() {
    if (location.pathname === "/watch" && document.readyState === "complete") {
      video = document.querySelector('video.html5-main-video');
      if (video) {
        setInterval(handle, 1000);
        addPictureInPictureButton();
      } else if (retry < MAX_RETRY) {
        retry++;
        setTimeout(waitForVideoPageLoad, 500);
      }
    } else {
      setTimeout(waitForVideoPageLoad, 1500);
    }
  }
  waitForVideoPageLoad();
}
