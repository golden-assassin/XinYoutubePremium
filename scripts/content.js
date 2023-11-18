if (location.host === "www.youtube.com") {
  let video;
  let permit = true;
  let retry = 0;
  const MAX_RETRY = 5;
  function handle() {
    const content = document.querySelectorAll("[class^='ytp-ad-text']");
    const first = content[0] || false;
    if (first) {
      const selector = document.querySelectorAll("[id^='skip-button']");
      const duration = video.duration || 999;
      video.currentTime = duration;
      if (selector) {
        for (const select of selector) {
          const button = select.querySelector("button");
          button && button.click();
        }
      }
    }
  }
  function input(event) { event.key === 'A' && permit ? togglePiP() : (event.key === 'R' && (permit = !permit)); }
  function togglePiP() {
    const video = document.querySelector('video.html5-main-video');
    document.pictureInPictureElement ? document.exitPictureInPicture() : video.requestPictureInPicture();
  }
  function addPiPButton() {
    const controls = document.querySelector(".ytp-right-controls");
    if (controls) {
      const button = document.createElement('button');
      button.innerHTML = 'PiP';
      button.style.cssText = "height:55%;opacity:0.9;display:inline-block;width:48px;padding:0px 2px;overflow:hidden;position:relative;top:-20px;background:transparent;border:1px solid #fff;color:#fff;border-radius:10vh;";
      button.addEventListener('click', togglePiP);
      controls.appendChild(button);
    } else if (retry < MAX_RETRY) {
      retry++;
      setTimeout(addPiPButton, 1000);
    }
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
      (video = document.querySelector('video.html5-main-video')) ?
        (setInterval(handle, 1000), addPiPButton()) :
        ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) :
      setTimeout(waitVideoLoad, 1500);
  }
  waitVideoLoad();
  window.addEventListener('keydown', input);
  window.addEventListener('beforeunload', () => {window.removeEventListener('keydown', input);});
}
