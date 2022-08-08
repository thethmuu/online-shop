window.addEventListener('DOMContentLoaded', () => {
  // cart remove buttons
  const removeItemButtons = document.querySelectorAll('.btn-danger');
  removeItemButtons.forEach((button) => {
    button.addEventListener('click', removeItem);
  });

  // cart quantity inputs
  const quantityInputs = document.querySelectorAll('.cart-quantity-input');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', updateCartTotal);
  });

  // add to cart buttons
  const addToCartButtons = document.querySelectorAll('.shop-item-button');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', handleAddToCart);
  });
});

function removeItem(event) {
  const btnClicked = event.target;
  btnClicked.closest('.cart-row').remove();
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemsContainer = document.querySelector('.cart-items');
  let cartRows = cartItemsContainer.querySelectorAll('.cart-row');
  let total = 0;
  cartRows.forEach((row) => {
    const priceEl = row.querySelector('.cart-price');
    const quantityInput = row.querySelector('.cart-quantity-input');
    const price = parseFloat(priceEl.textContent);
    const quantity = quantityInput.value;
    total += price * quantity;
    console.log(total);
  });

  document.querySelector('.cart-total-price').textContent = total.toFixed(2);
}

function handleAddToCart(event) {
  const shopItem = event.target.closest('.shop-item');
  const title = shopItem.querySelector('.shop-item-title').textContent;
  const price = shopItem.querySelector('.shop-item-price').textContent;
  console.log(title, price);
  addItemtoCartUI(title, price);
}

function addItemtoCartUI(title, price) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartRowContents = `<div class="cart-item cart-column">
                            <img
                              class="cart-item-image"
                              src="Images/Shirt.png"
                              width="100"
                              height="100"
                            />
                            <span class="cart-item-title">${title}</span>
                          </div>
                          <span class="cart-price cart-column">${price}</span>
                          <div class="cart-quantity cart-column">
                            <input
                              class="cart-quantity-input"
                              type="number"
                              min="1"
                              value="1"
                            />
                            <button class="btn btn-danger" type="button">REMOVE</button>
                          </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
}
