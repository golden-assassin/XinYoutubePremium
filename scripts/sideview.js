if (location.host === "www.youtube.com") {
  let video;
  function sideview() {
    const tops = document.querySelector("ytd-watch-metadata");
    const player = document.querySelector(".html5-video-player");
    const originalWidth = video.clientWidth;
    const originalHeight = video.clientHeight;

    window.addEventListener("scroll", function() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const topsOffset = tops.clientHeight;
      if (scrollPosition > innerHeight - topsOffset) {
        video.style.position = "fixed";
        video.style.top = "47px";
        video.style.left = "1px";
        video.style.zIndex = "1003";
        video.style.height = `${originalHeight * 0.5}px`;
        video.style.width = `${originalWidth * 0.5}px`;
        player.style.position = "unset";
      } else {
        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.zIndex = "0";
        video.style.height = `${originalHeight}px`;
        video.style.width = `${originalWidth}px`;
        player.style.position = "relative";
      }
    });
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
    (video = document.querySelector('video.html5-main-video')) ? sideview() :
    ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) : setTimeout(waitVideoLoad, 1000);
  }
  waitVideoLoad();
}
