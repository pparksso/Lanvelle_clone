const depth01s = document.querySelectorAll("#gnb .depth01");
const depth02Wrap = document.querySelectorAll("#gnb .depth02Wrap");
const depth01Arr = [...depth01s];
const newBest = depth01s[2];

depth01s.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    depth01Arr.forEach((item02) => {
      item02.classList.add("off");
    });
    item.classList.remove("off");
    depth02Wrap.forEach((item03, index03) => {
      if (index === index03) {
        item03.classList.add("on");
      } else {
        item03.classList.remove("on");
      }
      item03.addEventListener("mouseleave", () => {
        item03.classList.remove("on");
        item.classList.remove("off");
      });
    });
  });
});
newBest.addEventListener("mouseleave", function () {
  depth01s.forEach((item) => {
    item.classList.remove("off");
  });
});
