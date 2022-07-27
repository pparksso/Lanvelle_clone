const tabs = document.querySelectorAll("#contents .tabs ul li");
const pannels = document.querySelectorAll("#contents .pannel");
const timeSaleArea = document.querySelector("#timesale");
const newBestArea = document.querySelector("#newBest");
const promotionArea = document.querySelector("#promotion");
const saleImgBox = document.querySelector("#timesale .saleImgBox");
const timerArea = document.querySelector("#timesale .timer");
const saleTxtBox = document.querySelector("#timesale .txtBox");
const salePriceBox = document.querySelector("#timesale .priceBox");
const tabsArr = [...tabs];

const mainSwiper = new Swiper("#mainVisual", {
  navigation: {
    nextEl: "#mainVisual .next",
    prevEl: "#mainVisual .prev",
  },
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 8000,
  },
});
//컨텐츠 탭판넬
tabs.forEach((item, idx) => {
  item.addEventListener("click", () => {
    tabsArr.forEach((i) => {
      i.classList.remove("on");
    });
    item.classList.add("on");
    pannels.forEach((item2, idx2) => {
      if (idx === idx2) {
        item2.classList.add("on");
      } else {
        item2.classList.remove("on");
      }
    });
  });
});

//타임세일구역 타이머생성함수
function timerMaker() {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const outTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 13, 0, 0);
  const leftTime = outTime - today;
  const hour = Math.floor(leftTime / (1000 * 60 * 60));
  const min = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor(((leftTime % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
  const hours = hour < 10 ? `0${hour}` : hour;
  const minutes = min < 10 ? `0${min}` : min;
  const seconds = sec < 10 ? `0${sec}` : sec;
  // console.log(hours + ":" + minutes + ":" + seconds);
  let tempHtml = `<span>${hours}</span> : <span>${minutes}</span> : <span>${seconds}</span>`;
  timerArea.innerHTML = tempHtml;
}

//타임세일
const timeSaleMake = function () {
  axios
    .get("../data/timesale.json")
    .then((res) => {
      const data = res.data;
      const imgPath = data.imgPath;
      const item = data.items[0];
      const percentage = 100 - Math.floor((item.salePrice / item.originalPrice) * 100);
      const originalPrice = item.originalPrice.toLocaleString("ko-KR");
      const salePrice = item.salePrice.toLocaleString("ko-KR");
      let tempImg = "";
      let tempTxt = "";
      let tempPrice = "";
      tempImg = `
            <div class="imgBox">
              <img src="../images/main/${item.img}" alt="${item.title}" />
            </div>`;
      tempTxt = `
              <h1 class="title">${item.title}</h1>
              <p class="desc">${item.desc}</p>`;
      tempPrice = `
            <span class="percent"><strong>${percentage}</strong>%</span><span class="originalPrice">${originalPrice}원</span><span class="salePrice"><strong>${salePrice}</strong>원</span>`;
      saleImgBox.innerHTML = tempImg;
      saleTxtBox.innerHTML = tempTxt;
      salePriceBox.innerHTML = tempPrice;
    })
    .catch((err) => {
      console.log(err);
    });
};

setInterval(timerMaker, 1000);
timeSaleMake();
