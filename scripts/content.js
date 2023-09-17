const hostUrl = location.host;

let video;
let adSkipInterval;
let retryCount = 0;
const maxRetryCount = 10;

function handleAd() {
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

function getItemAndAddButton() {
  const item = document.querySelector(".item .style-scope .ytd-watch-metadata");
  if (item) {
    const button = document.createElement('button');
    button.innerHTML = 'Picture';
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
  } else if (retryCount < maxRetryCount) {
    retryCount++;
    console.log(`Retry ${retryCount}...`);
    setTimeout(getItemAndAddButton, 1000);
  } else {
    console.log('Reached maximum retry count. Giving up.');
  }
}

function waitForPageLoad() {
  if (document.readyState === "complete") {
    video = document.querySelector('.html5-main-video');
    adSkipInterval = setInterval(handleAd, 1000);
    getItemAndAddButton();
    console.log("complete");
  } else {
    setTimeout(waitForPageLoad, 1000);
  }
}

if (hostUrl === "www.youtube.com") {
  waitForPageLoad();
}
