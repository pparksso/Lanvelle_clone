const tabs = document.querySelectorAll("#contents .tabs ul li");
const pannels = document.querySelectorAll("#contents .pannel");
const timeSaleArea = document.querySelector("#timesale");
const newBestArea = document.querySelector("#newBest ul");
const promotionArea = document.querySelector("#promotion ul");
const bestProductArea = document.querySelector("#bestProduct ul");
const saleImgBox = document.querySelector("#timesale .saleImgBox");
const timerArea = document.querySelector("#timesale .timer");
const saleTxtBox = document.querySelector("#timesale .txtBox");
const salePriceBox = document.querySelector("#timesale .priceBox");
const instaList = document.querySelector("#instagram .swiper-wrapper");
const instaItems = document.querySelectorAll("#instagram .swiper-slide");
const hashTag = document.querySelector("#instagram .hashtag");
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

let instaSwiper = undefined;
let screenWidth = body.clientWidth;
function resizeSwiper() {
  if (screenWidth > 1620 && instaSwiper == undefined) {
    instaSwiper = new Swiper(".instagramWrap", {
      centeredSlides: true,
      centerInsufficientSlides: true,
      slidesPerView: 4.5,
    });
  } else if (screenWidth < 1621 && instaSwiper != undefined) {
    instaSwiper.destroy();
    instaSwiper = undefined;
  }
}

resizeSwiper();

window.addEventListener("resize", () => {
  screenWidth = body.clientWidth;
  resizeSwiper();
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
  const tomorrowKeep = new Date();
  const todaySec = Math.trunc(today.getTime() / 1000);
  const tomorrow = new Date(tomorrowKeep.setDate(tomorrowKeep.getDate() + 1));
  let outTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 13, 0, 0);
  let outTimeSec = Math.trunc(outTime.getTime() / 1000);
  // 타임아웃시간 설정 함수
  const timeChange = (day) => {
    outTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 13, 0, 0);
    outTimeSec = Math.trunc(outTime.getTime() / 1000);
    const leftTime = outTimeSec - todaySec;
    const hour = Math.floor(leftTime / (60 * 60));
    const min = Math.floor((leftTime % (60 * 60)) / 60);
    const sec = Math.floor((leftTime % (60 * 60)) % 60);
    const hours = hour < 10 ? `0${hour}` : hour;
    const minutes = min < 10 ? `0${min}` : min;
    const seconds = sec < 10 ? `0${sec}` : sec;
    let tempHtml = `<span>${hours}</span> : <span>${minutes}</span> : <span>${seconds}</span>`;
    timerArea.innerHTML = tempHtml;
  };
  outTimeSec - todaySec >= 86400 ? timeChange(today) : timeChange(tomorrow);
}

//타임세일
const timeSaleMake = () => {
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
              <img src="${imgPath}${item.img}" alt="${item.title}" />
            </div>`;
      tempTxt = `
              <a href =""><h1 class="title">${item.title}</h1>
              <p class="desc">${item.desc}</p></a>`;
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

//newBest, promotion, bestProduct 생성함수
const contentsMaker = (title, area) => {
  axios
    .get(`../data/${title}.json`)
    .then((res) => {
      const data = res.data;
      const imgPath = data.imgPath;
      const items = data.items;
      let tempHtml = "";
      items.forEach((item, idx) => {
        if (item.originalPrice > 0) {
          const percentage = 100 - Math.floor((item.salePrice / item.originalPrice) * 100);
          const originalPrice = item.originalPrice.toLocaleString("ko-KR");
          const salePrice = item.salePrice.toLocaleString("ko-KR");
          tempHtml += `
        <li class="add purchaseOn">
        <a href="" class="${title}ImgBox">
          <div class="imgBox">
            <img src="${imgPath}${item.img}" alt="${item.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${item.title}</h1>
            <p class="desc">${item.desc}</p>
          </a>
        </div>
        <div class="priceBox">
          <span class="percent"><strong>${percentage}</strong>%</span><span class="originalPrice">${originalPrice}원</span><span class="salePrice"><strong>${salePrice}</strong>원</span>
        </div>
        <div class="purchaseBox">
          <ul>
            <li>
              <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
            </li>
            <li>
              <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
            </li>
          </ul>
          <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
        </div>
        </div>
      </li>
        `;
        } else {
          tempHtml += `
        <li class="add purchaseOn">
        <a href="" class="newBestImgBox">
          <div class="imgBox">
            <img src="${imgPath}${item.img}" alt="${item.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${item.title}</h1>
            <p class="desc">${item.desc}</p>
          </a>
        </div>
        <div class="priceBox">
          <span class="salePrice center"><strong>${item.salePrice}</strong>원</span>
        </div>
        <div class="purchaseBox">
          <ul>
            <li>
              <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
            </li>
            <li>
              <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
            </li>
          </ul>
          <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
        </div>
        </div>
      </li>
        `;
        }
        area.innerHTML = tempHtml;
        if (data.swiper === true) {
          const swiperList = document.querySelectorAll("#newBest .list .add");
          swiperList.forEach((li) => {
            li.classList.add("swiper-slide");
          });
        }
      });
    })
    .then(() => {
      const newBestSwiper = new Swiper("#newBest", {
        speed: 1000,
        loop: true,
        navigation: {
          nextEl: "#newBest .next",
          prevEl: "#newBest .prev",
        },
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 320px
          1750: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          1400: {
            slidesPerView: 4,
          },
          // when window width is >= 640px
          1280: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2,
          },
        },
      });
    })
    .then(() => {
      const filterWrap = () => {
        const listEl = document.querySelectorAll(`#contents .item .add`);
        const listElArr = [...listEl];
        listEl.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            listElArr.forEach((item02) => {
              item02.classList.add("filter");
            });
            item.classList.remove("filter");
          });
          item.addEventListener("mouseleave", () => {
            listElArr.forEach((item03) => {
              item03.classList.remove("filter");
            });
          });
        });
      };
      filterWrap();
    })
    .catch((err) => {
      console.log(err);
    });
};

setInterval(timerMaker, 1000);
contentsMaker("newBest", newBestArea);
contentsMaker("promotion", promotionArea);
timeSaleMake();
contentsMaker("bestProduct", bestProductArea);
