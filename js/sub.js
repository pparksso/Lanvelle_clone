const subDepth01s = document.querySelectorAll("#all .subDepth01");
const subTabs = document.querySelectorAll("#all .subTab");
const subTabsItems = document.querySelectorAll("#all .subTabItem");
const countNum = document.querySelector("#shopList .countNum");
const pickItemList = document.querySelector("#shopList .itemList");
const pageNum = document.querySelector("#pageWrap .pageNum");

const subDepth01Arr = [...subDepth01s];
const subTabsArr = [...subTabs];
const subTabItemsArr = [...subTabsItems];
let tempHtml = "";
let count = 0;

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

const firstSortMaker = () => {
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
        pickItemList.innerHTML = tempHtml;
        countNum.innerHTML = count;
      });
    })
    // .then(() => {
    //   subTabsItems.forEach((item, index) => {
    //     item.addEventListener("click", (e) => {
    //       e.preventDefault();
    //       pickItemList.innerHTML = "";
    //       count = 0;
    //       countNum.innerHTML = "";
    //       tempHtml = "";
    //       noItem.classList.remove("on");
    //       subTabItemsArr.forEach((arrEl) => {
    //         arrEl.classList.remove("on");
    //       });
    //       item.classList.add("on");
    //       axios.get("../data/all.json").then((respond) => {
    //         const pickData = respond.data;
    //         const pickItems = pickData.items;
    //         const imgPath = pickData.imgPath;
    //         pickItems.forEach((pickEl, pickIdx) => {
    //           const idx = pickEl.pickIndex;
    //           if (index > 1 && idx.includes(index)) {
    //             noItem.classList.remove("on");
    //             count++;
    //             if (pickEl.originalPrice > 0) {
    //               const percentage = 100 - Math.floor((pickEl.salePrice / pickEl.originalPrice) * 100);
    //               const originalPrice = pickEl.originalPrice.toLocaleString("ko-KR");
    //               const salePrice = pickEl.salePrice.toLocaleString("ko-KR");
    //               tempHtml += `
    //     <li class="add purchaseOn el">
    //     <a href="" class="">
    //       <div class="imgBox">
    //         <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //       </div>
    //     </a>
    //     <div class="right">
    //     <div class="txtBox">
    //       <a href="">
    //         <h1 class="title">${pickEl.title}</h1>
    //         <p class="desc">${pickEl.desc}</p>
    //       </a>
    //     </div>
    //     <div class="priceBox">
    //       <span class="percent"><strong>${percentage}</strong>%</span><span class="originalPrice">${originalPrice}원</span><span class="salePrice"><strong>${salePrice}</strong>원</span>
    //     </div>
    //     <div class="purchaseBox">
    //       <div class="pc">
    //         <ul>
    //           <li>
    //             <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //           </li>
    //           <li>
    //             <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //           </li>
    //         </ul>
    //         <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //       </div>
    //       <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //     </div>
    //     </div>
    //   </li>
    //     `;
    //             } else {
    //               tempHtml += `
    //     <li class="add purchaseOn el">
    //     <a href="" class="newBestImgBox">
    //       <div class="imgBox">
    //         <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //       </div>
    //     </a>
    //     <div class="right">
    //     <div class="txtBox">
    //       <a href="">
    //         <h1 class="title">${pickEl.title}</h1>
    //         <p class="desc">${pickEl.desc}</p>
    //       </a>
    //     </div>
    //     <div class="priceBox">
    //       <span class="salePrice center"><strong>${pickEl.salePrice}</strong>원</span>
    //     </div>
    //     <div class="purchaseBox">
    //       <div class="pc">
    //         <ul>
    //           <li>
    //             <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //           </li>
    //           <li>
    //             <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //           </li>
    //         </ul>
    //         <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //       </div>
    //       <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //     </div>
    //     </div>
    //   </li>`;
    //             }
    //             pickItemList.innerHTML = tempHtml;
    //             countNum.innerHTML = count;
    //           } else if (index === 0) {
    //             count++;
    //             if (pickEl.originalPrice > 0) {
    //               const percentage = 100 - Math.floor((pickEl.salePrice / pickEl.originalPrice) * 100);
    //               const originalPrice = pickEl.originalPrice.toLocaleString("ko-KR");
    //               const salePrice = pickEl.salePrice.toLocaleString("ko-KR");
    //               tempHtml += `
    //             <li class="add purchaseOn el">
    //             <a href="" class="">
    //               <div class="imgBox">
    //                 <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //               </div>
    //             </a>
    //             <div class="right">
    //             <div class="txtBox">
    //               <a href="">
    //                 <h1 class="title">${pickEl.title}</h1>
    //                 <p class="desc">${pickEl.desc}</p>
    //               </a>
    //             </div>
    //             <div class="priceBox">
    //               <span class="percent"><strong>${percentage}</strong>%</span><span class="originalPrice">${originalPrice}원</span><span class="salePrice"><strong>${salePrice}</strong>원</span>
    //             </div>
    //             <div class="purchaseBox">
    //               <div class="pc">
    //                 <ul>
    //                   <li>
    //                     <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //                   </li>
    //                   <li>
    //                     <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //                   </li>
    //                 </ul>
    //                 <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //               </div>
    //               <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //             </div>
    //             </div>
    //           </li>
    //             `;
    //             } else {
    //               tempHtml += `
    //             <li class="add purchaseOn el">
    //             <a href="" class="newBestImgBox">
    //               <div class="imgBox">
    //                 <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //               </div>
    //             </a>
    //             <div class="right">
    //             <div class="txtBox">
    //               <a href="">
    //                 <h1 class="title">${pickEl.title}</h1>
    //                 <p class="desc">${pickEl.desc}</p>
    //               </a>
    //             </div>
    //             <div class="priceBox">
    //               <span class="salePrice center"><strong>${pickEl.salePrice}</strong>원</span>
    //             </div>
    //             <div class="purchaseBox">
    //               <div class="pc">
    //                 <ul>
    //                   <li>
    //                     <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //                   </li>
    //                   <li>
    //                     <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //                   </li>
    //                 </ul>
    //                 <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //               </div>
    //               <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //             </div>
    //             </div>
    //           </li>
    //             `;
    //             }
    //             pickItemList.innerHTML = tempHtml;
    //             countNum.innerHTML = count;
    //           } else if (index === 1 && pickEl.promotion === true) {
    //             count++;
    //             if (pickEl.originalPrice > 0) {
    //               const percentage = 100 - Math.floor((pickEl.salePrice / pickEl.originalPrice) * 100);
    //               const originalPrice = pickEl.originalPrice.toLocaleString("ko-KR");
    //               const salePrice = pickEl.salePrice.toLocaleString("ko-KR");
    //               tempHtml += `
    //             <li class="add purchaseOn el">
    //             <a href="" class="">
    //               <div class="imgBox">
    //                 <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //               </div>
    //             </a>
    //             <div class="right">
    //             <div class="txtBox">
    //               <a href="">
    //                 <h1 class="title">${pickEl.title}</h1>
    //                 <p class="desc">${pickEl.desc}</p>
    //               </a>
    //             </div>
    //             <div class="priceBox">
    //               <span class="percent"><strong>${percentage}</strong>%</span><span class="originalPrice">${originalPrice}원</span><span class="salePrice"><strong>${salePrice}</strong>원</span>
    //             </div>
    //             <div class="purchaseBox">
    //               <div class="pc">
    //                 <ul>
    //                   <li>
    //                     <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //                   </li>
    //                   <li>
    //                     <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //                   </li>
    //                 </ul>
    //                 <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //               </div>
    //               <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //             </div>
    //             </div>
    //           </li>
    //             `;
    //             } else {
    //               tempHtml += `
    //             <li class="add purchaseOn el">
    //             <a href="" class="newBestImgBox">
    //               <div class="imgBox">
    //                 <img src="${imgPath}${pickEl.img}" alt="${pickEl.title}" />
    //               </div>
    //             </a>
    //             <div class="right">
    //             <div class="txtBox">
    //               <a href="">
    //                 <h1 class="title">${pickEl.title}</h1>
    //                 <p class="desc">${pickEl.desc}</p>
    //               </a>
    //             </div>
    //             <div class="priceBox">
    //               <span class="salePrice center"><strong>${pickEl.salePrice}</strong>원</span>
    //             </div>
    //             <div class="purchaseBox">
    //               <div class="pc">
    //                 <ul>
    //                   <li>
    //                     <button><img src="../images/main/heat_btn.png" alt="찜하기" /></button>
    //                   </li>
    //                   <li>
    //                     <button><img src="../images/main/cart_btn.png" alt="장바구니에 넣기" /></button>
    //                   </li>
    //                 </ul>
    //                 <button class="card"><span class="material-icons"> credit_card </span>&nbsp;<span>바로구매</span></button>
    //               </div>
    //               <div class="m">
    //       <ul>
    //           <li><button><img src="../images/main/prd_wish.svg" alt="위시리스트"></button></li>
    //           <li><button><img src="../images/main/prd_cart.svg" alt="장바구니"></button></li>
    //           <li><button><img src="../images/main/prd_buy.svg" alt="카드"></button></li>
    //         </ul>
    //     </div>
    //             </div>
    //             </div>
    //           </li>
    //             `;
    //             }
    //             pickItemList.innerHTML = tempHtml;
    //             countNum.innerHTML = count;
    //           } else if (!idx.includes(index)) {
    //             count = 0;
    //             noItem.classList.add("on");
    //             countNum.innerHTML = count;
    //           }
    //         });
    //       });
    //     });
    //   });
    // })

    .catch((err) => {
      console.log(err);
    });
};

const subSortMaker = () => {
  subTabsItems.forEach((subTab, subTabIndex) => {
    subTab.addEventListener("click", (e) => {
      e.preventDefault();
      pickItemList.innerHTML = "";
      count = 0;
      countNum.innerHTML = "";
      tempHtml = "";
      subTabItemsArr.forEach((arrEl) => {
        arrEl.classList.remove("on");
      });
      subTab.classList.add("on");
      axios.get("../data/all.json").then((respond) => {
        const data = respond.data;
        const items = data.items;
        const imgPath = data.imgPath;
        items.forEach((el) => {
          const idx = el.pickIndex;
          if (subTabIndex > 1 && idx.includes(subTabIndex)) {
            count++;
            if (el.originalPrice > 0) {
              const percentage = 100 - Math.floor((el.salePrice / el.originalPrice) * 100);
              const originalPrice = el.originalPrice.toLocaleString("ko-KR");
              const salePrice = el.salePrice.toLocaleString("ko-KR");
              tempHtml += `
        <li class="add purchaseOn el">
        <a href="" class="">
          <div class="imgBox">
            <img src="${imgPath}${el.img}" alt="${el.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${el.title}</h1>
            <p class="desc">${el.desc}</p>
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
        <li class="add purchaseOn el">
        <a href="" class="newBestImgBox">
          <div class="imgBox">
            <img src="${imgPath}${el.img}" alt="${el.title}" />
          </div>
        </a>
        <div class="right">
        <div class="txtBox">
          <a href="">
            <h1 class="title">${el.title}</h1>
            <p class="desc">${el.desc}</p>
          </a>
        </div>
        <div class="priceBox">
          <span class="salePrice center"><strong>${el.salePrice}</strong>원</span>
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
      </li>`;
            }
          } else if (subTabIndex === 0) {
            count++;
            if (el.originalPrice > 0) {
              const percentage = 100 - Math.floor((el.salePrice / el.originalPrice) * 100);
              const originalPrice = el.originalPrice.toLocaleString("ko-KR");
              const salePrice = el.salePrice.toLocaleString("ko-KR");
              tempHtml += `
                <li class="add purchaseOn el">
                <a href="" class="">
                  <div class="imgBox">
                    <img src="${imgPath}${el.img}" alt="${el.title}" />
                  </div>
                </a>
                <div class="right">
                <div class="txtBox">
                  <a href="">
                    <h1 class="title">${el.title}</h1>
                    <p class="desc">${el.desc}</p>
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
                <li class="add purchaseOn el">
                <a href="" class="newBestImgBox">
                  <div class="imgBox">
                    <img src="${imgPath}${el.img}" alt="${el.title}" />
                  </div>
                </a>
                <div class="right">
                <div class="txtBox">
                  <a href="">
                    <h1 class="title">${el.title}</h1>
                    <p class="desc">${el.desc}</p>
                  </a>
                </div>
                <div class="priceBox">
                  <span class="salePrice center"><strong>${el.salePrice}</strong>원</span>
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
          } else if (subTabIndex === 1 && el.promotion === true) {
            count++;
            if (el.originalPrice > 0) {
              const percentage = 100 - Math.floor((el.salePrice / el.originalPrice) * 100);
              const originalPrice = el.originalPrice.toLocaleString("ko-KR");
              const salePrice = el.salePrice.toLocaleString("ko-KR");
              tempHtml += `
                <li class="add purchaseOn el">
                <a href="" class="">
                  <div class="imgBox">
                    <img src="${imgPath}${el.img}" alt="${el.title}" />
                  </div>
                </a>
                <div class="right">
                <div class="txtBox">
                  <a href="">
                    <h1 class="title">${el.title}</h1>
                    <p class="desc">${el.desc}</p>
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
                <li class="add purchaseOn el">
                <a href="" class="newBestImgBox">
                  <div class="imgBox">
                    <img src="${imgPath}${el.img}" alt="${el.title}" />
                  </div>
                </a>
                <div class="right">
                <div class="txtBox">
                  <a href="">
                    <h1 class="title">${el.title}</h1>
                    <p class="desc">${el.desc}</p>
                  </a>
                </div>
                <div class="priceBox">
                  <span class="salePrice center"><strong>${el.salePrice}</strong>원</span>
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
          }
          pickItemList.innerHTML = tempHtml;
          countNum.innerHTML = count;
        });
      });
    });
  });
};

firstSortMaker();
subSortMaker();
