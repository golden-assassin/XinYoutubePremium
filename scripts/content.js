const hostUrl = location.host;

if (hostUrl === "www.youtube.com") {
  let video = document.querySelector('.html5-main-video');
  let parent = document.querySelector(".ytd-watch-metadata");
  let button = document.createElement('button');
  let adSkipInterval;

  function skipAd() {
    try {
      const skipButton = document.querySelector(".ytp-ad-skip-button-container, .ytp-ad-overlay-close-container");
      if (skipButton) {
        video.currentTime = 999;
        skipButton.click();
      } else {
        console.log("No skip button found");
      }
    } catch (e) {
      console.error('Error while skipping ad:', e);
    }
  }

  adSkipInterval = setInterval(() => {
    skipAd();
  }, 1000);

  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  };

  button.innerHTML = 'picture in picture';
  button.style.cssText = `
    background-color: rgb(42,42,42);
    color: white;
    border-radius: 100vh;
    border: 0px;
    padding: 5px;
    margin: 5px;
  `;
  button.addEventListener('click', togglePictureInPicture);
  parent.appendChild(button);
} else {
  console.log("Not on YouTube. Skipping ad script.");
}
