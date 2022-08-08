if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', initUI);
} else {
  initUI();
}

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
}

function addItemToCartUI(title, price, img) {
  const cartItems = document.querySelector('.cart-items');
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartRowContent = `<div class='cart-item row justify-content-between             align-items-center border py-3'>
                            <div class='col-2'>
                                <img class='cart-img img-fluid' src=${img} alt='' />
                            </div>
                            <div class='col-8'>
                                <p class='fs-2'>${title}</p>
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

{
  /* <div class='cart-item row justify-content-between align-items-center border py-3'>
  <div class='col-2'>
    <img class='cart-img img-fluid' src='images/shirt-one.jpg' alt='' />
  </div>
  <div class='col-8'>
    <p class='fs-2'>The Original</p>
    <p class='text-secondary fs-5'>12,000</p>
  </div>
  <div class='col-1'>
    <input class='w-100' type='number' min='1' value='1' />
  </div>
</div>; */
}
