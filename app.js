// if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', initUI);
// } else {
//   initUI();
// }

function initUI() {
  // add to cart
  var addToCartButtons = document.querySelectorAll('.shop-item-button');
  console.log(addToCartButtons);
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', handleAddToCart);
  });
}

function handleAddToCart(event) {
  const shopItem = event.target.closest('.shop-item');
  const title = shopItem.querySelector('.shop-item-title').textContent;
  const price = shopItem.querySelector('.shop-item-price').textContent;
  const img = shopItem.querySelector('.shop-item-image').src;
  addItemToCartUI(title, price, img);
  updateCartTotal();
}

function addItemToCartUI(title, price, img) {
  const cartItems = document.querySelector('.cart-items');
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItemNames = document.querySelectorAll('.cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('Item already added');
      return;
    }
  }

  const cartRowContent = `<div class='cart-item row justify-content-between             align-items-center border py-3'>
                            <div class='col-2'>
                                <img class='cart-img img-fluid' src=${img} alt='' />
                            </div>
                            <div class='col-8'>
                                <p class='cart-item-title fs-2'>${title}</p>
                                <p class='cart-price text-secondary fs-5'>${price}</p>
                            </div>
                            <div class='col-1'>
                                <input class='cart-quantity-input w-100' type='number' min='1' value='1' />
                            </div>
                            <div class="col-1">
                                <button class="cart-remove btn btn-danger">Remove</button>
                            </div>
                        </div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.appendChild(cartRow);
  cartRow.querySelector('.cart-remove').addEventListener('click', removeItem);
  cartRow
    .querySelector('.cart-quantity-input')
    .addEventListener('change', handleQuantityChange);
}

function handleQuantityChange(event) {
  const input = event.target;
  if (input.value < 1) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeItem(event) {
  const removeConfirm = confirm('Are you sure to remove?');
  if (removeConfirm) {
    const btnClicked = event.target;

    btnClicked.closest('.cart-row').remove();
  }
  updateCartTotal();
}

function updateCartTotal() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartRows = cartItemsContainer.querySelectorAll('.cart-row');
  let total = 0;
  cartRows.forEach((row) => {
    const priceEl = row.querySelector('.cart-price');
    const quantityInput = row.querySelector('.cart-quantity-input');
    const price = parseFloat(priceEl.textContent);
    //   Number -> string -> number
    //   parseFloat => string -> float
    const quantity = quantityInput.value;

    total = total + price * quantity;
  });
  document.querySelector('.cart-total-price').textContent = total.toFixed(2);
}
