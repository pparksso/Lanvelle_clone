const body = document.querySelector("body");
const depth01s = document.querySelectorAll("#gnb .depth01");
const depth02Wrap = document.querySelectorAll("#gnb .depth02Wrap");
const header = document.querySelector("#header");
const headerLabel = document.querySelector("#headerLabel");
const headerLabelCloseBtn = document.querySelector("#headerLabel .closeBtn");
const video = document.querySelector("#bestProduct .videoBox iframe");
const scrollTopBtnList = document.querySelector("#scrollTop");
const scrollTopBtn = document.querySelector("#scrollTop .top");
const mHeader = document.querySelector("#mobileHeader");
const mGnb = document.querySelector("#mGnb");
const hamberger = document.querySelector("#mobileHeader .hamberger button");
const mDepth01s = document.querySelectorAll("#mGnb .mDepth01 span");
const mDepth02s = document.querySelectorAll("#mGnb .mDepth02");
const mDepthArrow = document.querySelectorAll("#mGnb .depthArrow");
const mDepth03s = document.querySelectorAll("#mGnb .mDepth03");
const mScrollTop = document.querySelector("#mScrollTop");
const infoBtn = document.querySelector("#mFooter .tab button");
const infoBox = document.querySelector("#mFooter .infoBox");
const mainVisual = document.querySelector("#mainVisual");

const depth01Arr = [...depth01s];
const newBest = depth01s[2];
const mDepth01Arr = [...mDepth01s];

depth01s.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    depth01Arr.forEach((item02) => {
      item02.classList.add("off");
    });
    item.classList.remove("off");
    header.classList.add("on");
    depth02Wrap.forEach((item03, index03) => {
      index === index03 ? item03.classList.add("on") : item03.classList.remove("on");
      item03.addEventListener("mouseleave", () => {
        item03.classList.remove("on");
        header.classList.remove("on");
        depth01Arr.forEach((item02) => {
          item02.classList.remove("off");
        });
      });
    });
  });
});
newBest.addEventListener("mouseleave", function () {
  depth01s.forEach((item) => {
    item.classList.remove("off");
  });
  header.classList.remove("on");
});
const headerLabelSlideUp = () => {
  headerLabelCloseBtn.addEventListener("click", () => {
    let screenWidth = body.clientWidth;
    if (screenWidth > 1250) {
      headerLabel.classList.add("off");
      video.classList.add("on");
      mainVisual.classList.remove("mobile");
    } else if (screenWidth < 1251) {
      headerLabel.classList.add("off");
      mainVisual.classList.add("mobile");
    }
  });
};
headerLabelSlideUp();
window.addEventListener("resize", () => {
  headerLabelSlideUp();
});
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  if (scrollTop > 0) {
    header.classList.add("scrollDown");
    scrollTopBtnList.classList.add("on");
    mScrollTop.classList.add("on");
  } else {
    header.classList.remove("scrollDown");
    scrollTopBtnList.classList.remove("on");
    mScrollTop.classList.remove("on");
  }
});

hamberger.addEventListener("click", function () {
  hamberger.classList.toggle("on");
  mGnb.classList.toggle("open");
});

// if (!mGnb.classList.contains("open")) {
//   mDepth01Arr.forEach((item) => {
//     item.classList.remove("off");
//   });
//   mDepth02s.forEach((item) => {
//     item.classList.remove("on");
//   });
//   mDepth03s.forEach((item) => {
//     item.classList.remove("on");
//   });
// }

mDepth01s.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    mDepth01Arr.forEach((dep01) => {
      dep01.classList.add("off");
    });
    item.classList.remove("off");
    mDepth02s.forEach((item02, index02) => {
      index === index02 ? item02.classList.toggle("on") : item02.classList.remove("on");
    });
  });
});

mDepthArrow.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    mDepth03s.forEach((item02, index02) => {
      if (index === index02) {
        item02.classList.toggle("on");
        item.classList.toggle("on");
      }
    });
  });
});

scrollTopBtn.addEventListener("click", () => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: body.offsetTop,
  });
});

mScrollTop.addEventListener("click", () => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: body.offsetTop,
  });
});

infoBtn.addEventListener("click", function () {
  this.classList.toggle("click");
  infoBox.classList.toggle("open");
});
