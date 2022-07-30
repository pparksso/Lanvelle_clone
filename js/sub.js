const subDepth01s = document.querySelectorAll("#all .subDepth01");
const subTabs = document.querySelectorAll("#all .subTab");
const subDepth01Arr = [...subDepth01s];
const subTabsArr = [...subTabs];

subDepth01s.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    subDepth01Arr.forEach((item02) => {
      item02.classList.remove("on");
    });
    item.classList.add("on");
    subTabs.forEach((item03, index03) => {
      if (index === index03) {
        item03.classList.add("on");
      } else {
        item03.classList.remove("on");
      }
    });
  });
});
