if (location.host === "www.youtube.com") {
  let video;
  let tab_off = true;

  async function setup() {
    const bottom = document.querySelector("#bottom-row");
    const description = bottom.querySelector("#description");
    const collapse = document.querySelector("#collapse");
    function tabClickHandler() {
      tab_off = false;
      description.removeEventListener("click", tabClickHandler);
    }
    function collapseClickHandler() {
      tab_off = true;
      setTimeout(() => {
        description.removeEventListener("click", tabClickHandler);
        description.addEventListener("click", tabClickHandler);
      }, 0);
    }
    description.addEventListener("click", tabClickHandler);
    collapse.addEventListener("click", collapseClickHandler);
  }


  function sideview() {
    setup();
    const styleElement = document.createElement("style");
    styleElement.innerHTML = '.video_left {left: 0 !important;top:56px !important;z-index: 1003;border-radius: 0 10px 10px 0;}';
    const tops = document.querySelector("ytd-watch-metadata");
    const player = document.querySelector(".html5-video-player");
    const bar = document.querySelector("#movie_player > div.ytp-chrome-bottom");
    let originalWidth = video.clientWidth;
    let originalHeight = video.clientHeight;
    function view(on = false) {
      const vs = video.style;
      const bs = bar.style;
      const ps = player.style;

      if (on) {
        video.classList.add("video_left");
        vs.position = "fixed";
        vs.height = `${Math.floor(originalHeight * 0.5)}px`;
        vs.width = `${Math.floor(originalWidth * 0.5)}px`;
        bs.opacity = "1";
        bs.position = "fixed";
        bs.left = "0px";
        bs.bottom = "0px";
        bs.background = "rgb(0, 0, 0, 0.5)";
        ps.position = "unset";
      } else {
        originalWidth = video.clientWidth;
        originalHeight = video.clientHeight;
        video.classList.remove("video_left");
        vs.position = "absolute";
        vs.height = "fit-content";
        originalHeight > originalWidth ? vs.width = "auto" : vs.width = "100%";
        bs.opacity = "revert-layer";
        bs.position = "absolute";
        bs.left = "12px";
        bs.bottom = "0";
        bs.background = "unset";
        ps.position = "relative";
      }
    }


    window.addEventListener("resize", function() {
      originalWidth = player.clientWidth;
      originalHeight = player.clientHeight;
    });
    window.addEventListener("scroll", function() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const topsOffset = tops.clientHeight;
      scrollPosition > innerHeight - topsOffset ? view(true) : view(false);
      !tab_off && view(false);
    });
    document.body.appendChild(styleElement);
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
    (video = document.querySelector('video.html5-main-video')) ? sideview() :
    ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) : setTimeout(waitVideoLoad, 1000);
  }
  waitVideoLoad();
}
