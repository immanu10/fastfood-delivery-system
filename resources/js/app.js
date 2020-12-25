import axios from "axios";
import Noty from "noty";
import moment from "moment";
import { initAdmin } from "./admin";

// const sectionCenter = document.querySelector(".section-center");
// const btnContainer = document.querySelector(".btn-container");
// const menuContainer = document.querySelector(".menu");

// const menu = JSON.parse(ejectMenu);
// window.addEventListener("DOMContentLoaded", function() {
//   displayMenuItems(menu);
//   displayFilterButtons();
// });

// function displayMenuItems(menuItems) {
//   let displayMenu = menuItems.map(function(item) {
//     return `<div class="w-64">
//       <img class="h-40 mb-4 mx-auto" src="/img/${item.image}" alt="menuimg" />
//       <div class="text-center">
//         <h2 class="mb-4 text-lg">${item.name}</h2>
//         <span class="size py-1 px-4 rounded-full uppercase text-xs"
//           >${item.size}</span
//         >
//         <div class="flex items-center justify-around mt-6">
//           <span class="font-bold text-lg">₹${item.price}</span>
//           <button
//             data-pizza='${JSON.stringify(item)}'
//             class="add-to-cart py-1 px-6 rounded-full flex items-center font-bold"

//           >
//             <span>+</span>
//             <span class="ml-4">Add</span>
//           </button>
//         </div>
//       </div>
//     </div>`;
//   });
//   displayMenu = displayMenu.join("");
//   sectionCenter.innerHTML = displayMenu;
// }

// function displayFilterButtons() {
//   const categories = menu.reduce(
//     function(values, item) {
//       if (!values.includes(item.category)) {
//         values.push(item.category);
//       }
//       return values;
//     },
//     ["all"]
//   );

//   let displayFilter = categories.map(function(item) {
//     if (item === "all")
//       return `<button class="filter-btn active" type="button" data-id=${item}>${item}</button>`;
//     else
//       return `<button class="filter-btn" type="button" data-id=${item}>${item}</button>`;
//   });

//   displayFilter = displayFilter.join("");
//   btnContainer.innerHTML = displayFilter;
//   const filterBtns = document.querySelectorAll(".filter-btn");
//   // console.log(filterBtns);
//   menuContainer.addEventListener("click", function(e) {
//     const id = e.target.dataset.id;
//     if (id) {
//       filterBtns.forEach(function(btn) {
//         btn.classList.remove("active");
//         btn.addEventListener("click", function(e) {
//           const category = e.currentTarget.dataset.id;
//           const menuCategory = menu.filter(function(menuItem) {
//             if (menuItem.category === category) {
//               return menuItem;
//             }
//           });
//           if (category === "all") {
//             displayMenuItems(menu);
//           } else {
//             displayMenuItems(menuCategory);
//           }
//         });
//       });
//       e.target.classList.add("active");
//     }
//   });
// }

let cartCounter = document.querySelector("#cartCounter");
let addToCart = document.querySelectorAll(".add-to-cart");
// console.log(addToCart);

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      //console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to Cart",
        progressBar: false,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",

        progressBar: false,
      }).show();
    });
}

initAdmin();

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(e.currentTarget.dataset.pizza);
    console.log(pizza);
    updateCart(pizza);
  });
});

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

// //change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let stepCompleted = true;

  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}
updateStatus(order);
