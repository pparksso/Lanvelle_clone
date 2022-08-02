const body = document.querySelector("body");
const depth01s = document.querySelectorAll("#gnb .depth01");
const depth02Wrap = document.querySelectorAll("#gnb .depth02Wrap");
const header = document.querySelector("#header");
const headerLabel = document.querySelector("#headerLabel");
const headerLabelCloseBtn = document.querySelector("#headerLabel .closeBtn");
const video = document.querySelector("#bestProduct .videoBox iframe");
const scrollTopBtnList = document.querySelector("#scrollTop");
const scrollTopBtn = document.querySelector("#scrollTop .top");
const hamberger = document.querySelector("#mobileHeader .hamberger button");
console.log("🚀 ~ file: layout.js ~ line 11 ~ hamberger", hamberger);

const depth01Arr = [...depth01s];
const newBest = depth01s[2];

depth01s.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    depth01Arr.forEach((item02) => {
      item02.classList.add("off");
    });
    item.classList.remove("off");
    header.classList.add("on");
    depth02Wrap.forEach((item03, index03) => {
      if (index === index03) {
        item03.classList.add("on");
      } else {
        item03.classList.remove("on");
      }
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

headerLabelCloseBtn.addEventListener("click", () => {
  headerLabel.classList.add("off");
  video.classList.add("on");
});

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  if (scrollTop > 0) {
    header.classList.add("scrollDown");
    scrollTopBtnList.classList.add("on");
  } else {
    header.classList.remove("scrollDown");
    scrollTopBtnList.classList.remove("on");
  }
});

hamberger.addEventListener("click", function () {
  hamberger.classList.toggle("on");
});

scrollTopBtn.addEventListener("click", () => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: body.offsetTop,
  });
});
