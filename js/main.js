const mainImg01s = document.querySelectorAll("#mainVisual .mainImg01");
const mainImg02s = document.querySelectorAll("#mainVisual .mainImg02");
const main02Titles = document.querySelectorAll("#mainVisual .title02");
const main02Subtitles = document.querySelectorAll("#mainVisual .subTitle02");
const tabs = document.querySelectorAll("#contents .tabs ul li");
const pannels = document.querySelectorAll("#contents .pannel");
const timeSaleArea = document.querySelector("#timesale");
const newBestArea = document.querySelector("#newBest ul");
const promotionArea = document.querySelector("#promotion ul");
const promoPageBtn = document.querySelector("#promotion .promoPage");
const bestProductArea = document.querySelector("#bestProduct .item");
const saleImgBox = document.querySelector("#timesale .saleImgBox");
const timerArea = document.querySelector("#timesale .timer");
const saleTxtBox = document.querySelector("#timesale .txtBox");
const salePriceBox = document.querySelector("#timesale .priceBox");
const keywordBox = document.querySelector("#bestProduct .keywordBox");
const instaList = document.querySelector("#instagram ul");
const instaItems = document.querySelectorAll("#instagram li");
const hashTag = document.querySelector("#instagram .hashtag");
const tabsArr = [...tabs];

const mainSwiper = new Swiper("#mainVisual", {
  speed: 1000,
  // loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: "#mainVisual .next",
    prevEl: "#mainVisual .prev",
  },
  pagination: {
    el: "#mainVisual .swiper-pagination-bulletBox",
    type: "bullets",
    clickable: true,
  },
});

const pagingSwiper = new Swiper("#mainVisual", {
  pagination: {
    el: "#mainVisual .swiper-pagination-fraction",
    type: "fraction",
  },
});
mainSwiper.controller.control = pagingSwiper;

let instaSwiper = undefined;
function resizeSwiper() {
  let screenWidth = body.clientWidth;
  if (screenWidth > 1620 && instaSwiper == undefined) {
    instaList.classList.add("swiper-wrapper");
    instaItems.forEach((item) => {
      item.classList.add("swiper-slide");
    });
    instaSwiper = new Swiper(".instagramWrap", {
      centeredSlides: true,
      centerInsufficientSlides: true,
      slidesPerView: 4.5,
    });
  } else if (screenWidth < 1621 && instaSwiper != undefined) {
    instaSwiper.destroy();
    instaSwiper = undefined;
    instaList.classList.remove("swiper-wrapper");
    instaItems.forEach((item) => {
      item.classList.remove("swiper-slide");
    });
  }
}

resizeSwiper();

window.addEventListener("resize", () => {
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
          <div class="pc">
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
        <div class="m">
          <ul>
              <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
              <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
              <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
            </ul>
        </div>
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
          <div class="pc">
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
          <div class="m">
          <ul>
              <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
              <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
              <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
            </ul>
        </div>
        </div>
        </div>
      </li>
        `;
        }
        area.innerHTML = tempHtml;
        if (data.swiper === true && data.title === "newBest") {
          const swiperList = document.querySelectorAll("#newBest .list .add");
          swiperList.forEach((li) => {
            li.classList.add("swiper-slide");
          });
        }

        if (data.swiper === true && data.title === "promotion") {
          const swiperList = document.querySelectorAll("#promotion .promotionList .add");
          swiperList.forEach((li) => {
            li.classList.add("swiper-slide");
          });
        }
      });
    })
    .then(() => {
      const newBestSwiper = new Swiper("#newBest", {
        slidesPerView: 1,
        speed: 1000,
        clickable: true,
        // loop: true,
        navigation: {
          nextEl: "#newBest .next",
          prevEl: "#newBest .prev",
        },
        breakpoints: {
          1750: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2,
          },
        },
      });

      let promoSwiper = null;
      function promoResizeSwiper() {
        let screenWidth = body.clientWidth;
        if (screenWidth < 1581 && promoSwiper == null) {
          promoPageBtn.classList.add("on");
          promoSwiper = new Swiper("#promotion", {
            slidesPerView: 1,
            speed: 1000,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: "#promotion .next",
              prevEl: "#promotion .prev",
            },
            // Responsive breakpoints
            breakpoints: {
              1750: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 2,
              },
            },
          });
        } else if (screenWidth > 1580 && promoSwiper != null) {
          promoSwiper.destroy();
          promoSwiper = null;
          promoPageBtn.classList.remove("on");
        }
      }
      promoResizeSwiper();
      window.addEventListener("resize", () => {
        promoResizeSwiper();
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
