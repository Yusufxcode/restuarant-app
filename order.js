//Adding dish to bag
const orders = document.querySelectorAll('.order');

for (let i = 0; i < orders.length; i++) {
  orders[i].addEventListener('click', () => {
    bagNumbers(dishes[i]);
    totalCost(dishes[i]);
  })
}

function onLoadOrders() {
  let dish = localStorage.getItem('orders');

  if (dish) {
    document.querySelector('.icons span').textContent = dish;
  }
}

function bagNumbers(dishes) {
  let dish = localStorage.getItem('orders');

  dish = parseInt(dish);
  if (dish) {
    localStorage.setItem('orders', dish + 1);
    document.querySelector('.icons span').textContent = dish + 1;
  } else {
    localStorage.setItem('orders', 1);
    document.querySelector('.icons span').textContent = 1;
  }

  setItems(dishes)
}

function setItems(dishes) {
  let bagItems = localStorage.getItem('dishesInbag');
  bagItems = JSON.parse(bagItems);

  if (bagItems != null) {

    if (bagItems[dishes.dish] == undefined) {
      bagItems = {
        ...bagItems,
        [dishes.dish]: dishes
      }
    }
    bagItems[dishes.tag].inBag += 1;
  } else {
    dishes.inBag = 1;
    bagItems = {
      [dishes.dish]: dishes
    }
  }

  localStorage.setItem('dishesInbag', JSON.stringify(bagItems));
}

function totalCost(dishes) {
  let bagCost = localStorage.getItem('totalCost');

  if (bagCost != null) {
    bagCost = parseInt(bagCost);
    localStorage.setItem("totalCost", bagCost + dishes.price);
  } else {
    localStorage.setItem('totalCost', dishes.price);
  }

}

function displayBagItems() {
  let bagContents = localStorage.getItem('dishesInbag');
  bagContents = JSON.parse(bagContents);
  let dishContainer = document.querySelector(".food-products");
  let bagCost = localStorage.getItem('totalCost');

  if (bagContents && dishContainer) {
    dishContainer.innerHTML = "";
    Object.values(bagContents).map((item, index) => {
      dishContainer.innerHTML += `
      <div class="food-product">
        <i class="fa-solid fa-xmark closed"></i>
        <img src="images/${item.tag}.jpg" alt=""/>
        <span class="dish-title">${item.dish}</span> 
        <div class="price">#${item.price}</div>
        <div class="quantity">
        <i class="decrease fa-solid fa-caret-left"></i>
          <span>${item.inBag}</span>
        <i class="increase fa-solid fa-caret-right"></i>
        </div>
        <div class="total">#${item.price * item.inBag}.00 </div>
      </div>
      `;
    });

    dishContainer.innerHTML += `
    <div class="bagTotalContainer">
      <h4 class="bagTotalTitle">
          Bag Total:
      </h4>
      <h4 class="bagTotal">
        #${bagCost}.00
      </h4>
    </div>`

    deleteButtons();
    manageQuantity();
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentDish = '';
  let dishItems = localStorage.getItem('dishesInbag');
  dishItems = JSON.parse(dishItems);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
      console.log(dishItems);
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      console.log(currentQuantity);
      currentDish = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
      console.log(currentDish);

      if (dishItems[currentDish].inBag > 1) {
        dishItems[currentDish].inBag -= 1;
        orders(dishItems[currentDish], 'decrease');
        totalCost(dishItems[currentDish], 'decrease');
        localStorage.setItem('dishesInbag', JSON.stringify(dishItems));
        displayBagItems();
      }
    });

    increaseButtons[i].addEventListener('click', () => {
      console.log(dishItems);
      currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
      console.log(currentQuantity);
      currentDish = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
      console.log(currentDish);

      dishItems[currentDish].inBag += 1;
      orders(dishItems[currentDish]);
      totalCost(dishItems[currentDish]);
      localStorage.setItem('dishesInbag', JSON.stringify(dishItems));
      displayBagItems();
    });
  }
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".food-products .closed");
  let dishNumbers = localStorage.getItem("orders");
  let dishCost = localStorage.getItem("totalCost");
  let bagItems = localStorage.getItem('dishesInbag');
  bagItems = JSON.parse(bagItems);
  let dishName;
  console.log(bagItems);

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      dishName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();
      localStorage.setItem('orders', dishNumbers - bagItems[dishName].inBag);
      localStorage.setItem('totalCost', dishCost - (bagItems[dishName].price * bagItems[dishName].inBag));

      delete bagItems[dishName];
      localStorage.setItem('dishesInbag', JSON.stringify(bagItems))

      displayBagItems();
      onLoadOrders();
    })
  }

}


onLoadOrders();
displayBagItems();