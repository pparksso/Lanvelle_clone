const subDepth01s = document.querySelectorAll("#all .subDepth01");
const subTabs = document.querySelectorAll("#all .subTab");
const subTabsItems = document.querySelectorAll("#all .subTabItem");
const countNum = document.querySelector("#shopList .countNum");
const pickList = document.querySelector("#shopList .pickList");
const pickBtn = document.querySelector("#shopList .pick");
const pickItemList = document.querySelector("#shopList .itemList");
const noItem = document.querySelector("#shopList .noItem");
const pageNum = document.querySelector("#pageWrap .pageNum");

const subDepth01Arr = [...subDepth01s];
const subTabsArr = [...subTabs];
const subTabItemsArr = [...subTabsItems];
let tempHtml = "";
let count = 0;
// const numOfItem = 25;
// const showItem = 12;
// const showBtn = 3;
// let nowPage = 1;

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

pickBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pickList.classList.toggle("on");
});

const sortMaker = () => {
  axios
    .get(`../data/all.json`)
    .then((res) => {
      const data = res.data;
      const imgPath = data.imgPath;
      const items = data.items;
      items.forEach((item, idx) => {
        count++;
        if (item.originalPrice > 0) {
          const percentage = 100 - Math.floor((item.salePrice / item.originalPrice) * 100);
          const originalPrice = item.originalPrice.toLocaleString("ko-KR");
          const salePrice = item.salePrice.toLocaleString("ko-KR");
          tempHtml += `
        <li class="add purchaseOn el">
        <a href="" class="">
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
        <li class="add purchaseOn el">
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
        pickItemList.innerHTML = tempHtml;
        countNum.innerHTML = count;
      });
    })
    .then(() => {
      subTabsItems.forEach((item, index) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          subTabItemsArr.forEach((arrEl) => {
            arrEl.classList.remove("on");
          });
          item.classList.add("on");
          pickItemList.innerHTML = "";
          countNum.innerHTML = "";
          tempHtml = "";
          count = "";
          axios.get("../data/all.json").then((respond) => {
            const pickData = respond.data;
            const pickItems = pickData.items;
            const imgPath = pickData.imgPath;
            pickItems.forEach((pickEl, pickIdx) => {
              const idx = pickEl.pickIndex;
              if (index > 1 && idx.includes(index)) {
                noItem.classList.remove("on");
                count++;
                if (pickEl.originalPrice > 0) {
                  const percentage = 100 - Math.floor((pickEl.salePrice / pickEl.originalPrice) * 100);
                  const originalPrice = pickEl.originalPrice.toLocaleString("ko-KR");
                  const salePrice = pickEl.salePrice.toLocaleString("ko-KR");
                  tempHtml += `
        <li class="add purchaseOn el">
        <a href="" class="">
          <div class="imgBox">
            <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${pickEl.title}</h1>
            <p class="desc">${pickEl.desc}</p>
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
        <li class="add purchaseOn el">
        <a href="" class="newBestImgBox">
          <div class="imgBox">
            <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${pickEl.title}</h1>
            <p class="desc">${pickEl.desc}</p>
          </a>
        </div>
        <div class="priceBox">
          <span class="salePrice center"><strong>${pickEl.salePrice}</strong>원</span>
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
      </li>`;
                }
                pickItemList.innerHTML = tempHtml;
                countNum.innerHTML = count;
              }
            });
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

sortMaker();
