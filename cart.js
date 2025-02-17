let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let tax = document.querySelector('.tax');
let subtotal = document.querySelector('.subtotal');

let count = 0;
//if add to cart btn clicked
$('.cart-btn').on('click', function (){
  let cart = $('.cart-nav');
  // find the img of that card which button is clicked by user
  let imgtodrag = $(this).parent('.buttons').parent('.content').parent('.card').find("img").eq(0);
  if (imgtodrag) {
    // duplicate the img
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      'opacity': '0.8',
      'position': 'absolute',
      'height': '150px',
      'width': '150px',
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 20,
      'left': cart.offset().left + 30,
      'width': 75,
      'height': 75
    }, 1000, 'easeInOutExpo');

    setTimeout(function(){
      count++;
      $(".cart-nav .item-count").text(count);
    }, 1500);

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function(){
      $(this).detach()
    });
  }
});


function initItem() {
  items.forEach((value, key) => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('style', 'width: 15rem;');
      card.innerHTML = `
          <img src="${value.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h4 class="card-title text-center">${value.name}</h4>
              <p class="card-text text-center">Price: ${value.price}</p>
              <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Add to Cart</button>
          </div>`;
      itemList.appendChild(card);
  });
}

initItem();

let cartLists = [];

function addToCart(key) {
  if (cartLists[key] == null) {
      cartLists[key] = JSON.parse(JSON.stringify(items[key]));
      cartLists[key].quantity = 1;
  }
  reloadCart();
}

function reloadCart() {
  cartList.innerHTML = '';
  let totalPrice = 0;
  cartLists.forEach((value, key) => {
      totalPrice = totalPrice + value.price;

      if (value != null) {
          let listItem = document.createElement('li');
          listItem.setAttribute('class', 'list-group-item');
          listItem.innerHTML = `
              <div><img src="${value.image}" style="width: 80px"/></div>
              <div><h5 class="mt-1">${value.name}</h5></div>
              <div><h6 class="mt-2">${value.price.toLocaleString()}</h6></div>
              <div>
                  <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                  <div class="count m-2">${value.quantity}</div>
                  <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
              </div>`;
          cartList.appendChild(listItem);
      }
  });

  // Calculate subtotal, tax, and total
  subtotal.innerText = totalPrice.toLocaleString();
  tax.innerText = (totalPrice * 0.12).toLocaleString(); // Assuming 12% tax
  total.innerText = (totalPrice + parseFloat(tax.innerText)).toLocaleString();

  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
      delete cartLists[key];
  } else {
      cartLists[key].quantity = quantity;
      cartLists[key].price = quantity * items[key].price;
  }
  reloadCart();
}

function clearCart() {
  cartLists = [];
  reloadCart();
}
