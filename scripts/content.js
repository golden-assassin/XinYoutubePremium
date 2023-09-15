const hostUrl = location.host;

if (hostUrl === "www.youtube.com") {
  let video = document.querySelector('.html5-main-video');
  let adSkipInterval;
  let item;
  let retryCount = 0;

  function skipAd() {
    try {
      const skipButton = document.querySelector(".ytp-ad-skip-button-container, .ytp-ad-overlay-close-container");
      if (skipButton) {
        video.currentTime = 999;
        skipButton.click();
        console.log('skip');
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
  }
  function getItemAndAddButton() {
    item = document.querySelector(".item .style-scope .ytd-watch-metadata");
    if (item) {
      let button = document.createElement('button');
      button.innerHTML = 'picture in picture';
      button.style.cssText = `
        background-color: rgb(42, 42, 42);
        color: white;
        border-radius: 100vh;
        border: 0px;
        padding: 10px;
        margin: 0 10px;
      `;
      button.addEventListener('click', togglePictureInPicture);
      item.appendChild(button);
    } else {
      if (retryCount < 10) {
        retryCount++;
        console.log(`Retry ${retryCount}...`);
        setTimeout(getItemAndAddButton, 1000);
      } else {
        console.log('Reached maximum retry count. Giving up.');
      }
    }
  }
  getItemAndAddButton();
}
