if (location.host === "www.youtube.com") {
  let video;
  let tab_off = true;

  async function Hidden() {
    const bottom_row = document.querySelector("#bottom-row");
    const tab = bottom_row.querySelector("#description");
    const collapse = document.querySelector("#collapse");

    function tabClickHandler() {
      tab_off = false;
      tab.removeEventListener("click", tabClickHandler);
    }
    function collapseClickHandler() {
      tab_off = true;
      setTimeout(() => {
        tab.removeEventListener("click", tabClickHandler);
        tab.addEventListener("click", tabClickHandler);
      }, 0);
    }
    tab.addEventListener("click", tabClickHandler);
    collapse.addEventListener("click", collapseClickHandler);
  }


  function sideview() {
    Hidden()
    const tops = document.querySelector("ytd-watch-metadata");
    const player = document.querySelector(".html5-video-player");
    const bar = document.querySelector("#movie_player > div.ytp-chrome-bottom")
    let originalWidth = video.clientWidth;
    let originalHeight = video.clientHeight;
    function view(on=false) {
      const vs = video.style;
      const bs = bar.style
      const ps = player.style
      if (on) {
        vs.position = "fixed";
        vs.top = "56px";
        vs.left = "1px";
        vs.zIndex = "1003";
        vs.height = `${Math.floor(originalHeight * 0.5)}px`;
        vs.width = `${Math.floor(originalWidth * 0.5)}px`;
        vs.borderRadius = "0 0 15px 0";
        bs.opacity = "1";
        bs.position = "fixed";
        bs.left = "0px";
        bs.bottom = "0px";
        bs.background = "rgb(0,0,0,0.5)"
        ps.position = "unset";
      } else {
        vs.position = "absolute";
        vs.top = "0";
        vs.left = "0";
        vs.zIndex = "0";
        vs.height = "fit-content";
        vs.width = "revert-layer";
        vs.borderRadius = "unset";
        bs.opacity = "revert-layer";
        bs.position = "absolute";
        bs.left = "12px"
        bs.bottom = "0";
        bs.background = "unset"
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
      !tab_off && view(false)
    });
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
    (video = document.querySelector('video.html5-main-video')) ? sideview() :
    ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) : setTimeout(waitVideoLoad, 1000);
  }
  waitVideoLoad();
}
