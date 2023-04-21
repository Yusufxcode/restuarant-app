//mobile menu toggle
const menu = document.querySelector('.menu');
const mobile = document.querySelector('nav');
const close = document.querySelector(".close");

menu.addEventListener('click', ()=>{
  mobile.style.display = "block";
})

close.addEventListener('click', ()=>{
   mobile.style.display = "none";
})



//carousel
let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("carousel");
const dots = document.getElementsByClassName("dot");

showSlides();
function currentSlide(index) {
     slideIndex = index;
     showSlides();
}
function plusSlides(step) {
  
  if(step < 0) {
      slideIndex -= 2;
      
      if(slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
  }
  
  showSlides();
}
function showSlides() {
  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove('active');
  }
  slideIndex++;
  if(slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add('active');
   if(timeoutId) {
      clearTimeout(timeoutId);
   }
  timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

//dishes filter
const dishSelector = document.querySelector('.dish-selector').children;
const dishContainer = document.querySelector('.dish-container').children;

for (let i = 0; i < dishSelector.length; i++){
  dishSelector[i].addEventListener('click', function (){
    for (let j = 0; j < dishSelector.length; j++){
      dishSelector[j].classList.remove('active');
    } 
    this.classList.add('active');
    const target = this.getAttribute('data-target')

    for (let k = 0; k < dishContainer.length; k++){
      dishContainer[k].style.display = "none";
      if (target == dishContainer[k].getAttribute('data-id')) {
      dishContainer[k].style.display = "block"
    }
    if (target === 'all') {
      dishContainer[k].style.display = 'block';
    }
    }
  })  
} 


//Adding dish to bag
const orders = document.querySelectorAll('.order');

for (let i = 0; i < orders.length; i++){
  orders[i].addEventListener('click', ()=> {
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

  if(bagItems != null) {

    if(bagItems[dishes.dish] == undefined){
      bagItems = {
        ...bagItems,
        [dishes.dish]: dishes
      }
    }
    bagItems[dishes.dish].inBag += 1;
  } else {
    dishes.inBag = 1;
    bagItems = {
      [dishes.dish]: dishes
    }
  }
  
  localStorage.setItem('dishesInbag', JSON.stringify(bagItems));
}

function totalCost(dishes){
  let bagCost = localStorage.getItem('totalCost');

  if(bagCost != null){
    bagCost = parseInt(bagCost);
    localStorage.setItem("totalCost", bagCost + dishes.price);
  } else {
    localStorage.setItem('totalCost', dishes.price);
  }

}

function displayBagItems(){
  let bagContents = localStorage.getItem('dishesInBag');
  bagContents = JSON.parse(bagContents);
  console.log (bagContents);
}

onLoadOrders();
displayBagItems()