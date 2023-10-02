if (location.host === "www.youtube.com") {
  let video;
  let retry = 0;
  const maxRetry = 10;

  function handle() {
    try {
      const skipButton = document.querySelector(".ytp-ad-skip-button-container, .ytp-ad-overlay-close-container");
      const adText = document.querySelector(".ytp-ad-text, .ytp-ad-preview-text");
      if (skipButton || adText) {
        video.currentTime = 999;
        if (skipButton) {
          skipButton.click();
        }
      }
    } catch (e) {
      console.error(`Error while handling ad: ${e.message}`);
    }
  }
  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  }
  function PictureInPictureButton() {
    const controls = document.querySelector(".ytp-right-controls");
    if (controls) {
      const button = document.createElement('button');
      button.innerHTML = 'Picture';
      button.style.cssText = `height:55%;opacity:0.9;display:inline-block;width:48px;padding:0px 2px;overflow:hidden;position:relative;top:-20px;background:transparent;border:1px solid #fff;color:#fff;border-radius:100vh;`;
      button.addEventListener('click', togglePictureInPicture);
      controls.appendChild(button);
    } else if (retry < maxRetry) {
      retry++;
      setTimeout(PictureInPictureButton, 1000);
    }
  }
  function waitForPageLoad() {
    if (document.readyState === "complete") {
      video = document.querySelector('.html5-main-video');
      setInterval(handle, 1000);
      PictureInPictureButton();
    } else {
      setTimeout(waitForPageLoad, 1000);
    }
  }
  waitForPageLoad();
}
