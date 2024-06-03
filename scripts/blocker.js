if (location.host === "www.youtube.com") {
  var video;
  const handle = () => {
    if (location.pathname === "/watch") {
      const button = document.querySelector("[id^='skip-button'] button, [class='ytp-skip-ad-button']");
      const text = document.querySelector("[class^='ytp-ad-text']");
      if (text || button) {
        video = video || document.querySelector('video.html5-main-video');
        video.muted = true;
        video.playbackRate = 16;
        button && button.click();
      } else {
        if (video && video.playbackRate == 16) {
          video.playbackRate = 1;
          video.muted = false;
          if (video.paused) {
            video.play();
          }
        }
      };
      const styleId = '114514yaju';
      const createStyleElement = () => {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = 'tp-yt-paper-dialog[modern] {overflow: auto !important;}tp-yt-paper-dialog , tp-yt-iron-overlay-backdrop {display: none !important;overflow: auto !important;}';
        document.body.appendChild(style);
      };
      const element = document.getElementById(styleId);
      !element && createStyleElement();
    } else video = null;
  };
  setInterval(handle, 500);
};

// video ? (video.currentTime = video.duration || 999) : null;
