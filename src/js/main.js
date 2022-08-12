// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', initUI);
} else {
  initUI();
}

function initUI() {
  // show items to UI
  showProductsToUI();
}

// form
const form = document.querySelector('.checkout-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(form).entries());
  // save to localStorage
  localStorage.setItem('shop.customer', JSON.stringify(formData));

  const customerName = JSON.parse(localStorage.getItem('shop.customer')).name;

  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.textContent = 'Saving...';

  setTimeout(() => {
    const checkoutContainer = document.querySelector('.checkout-container');
    checkoutContainer.innerHTML = `
        <div class="complete-state text-center border rounded px-4 py-3">
          <i class="bi bi-check-circle-fill fs-1"></i>
          <h2 class="mt-3">Thank you , ${customerName}!</h2>
          <p class="mt-3">
            We've saved your order details! Will contact you soon.
          </p>
          <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-dark">Continue</button>
          </div>
        </div>`;
  }, 2000);
});

function showItemtoList(item) {
  const lastestItemsContainer = document.querySelector('.latest-container');
  const newUIItem = document.createElement('div');
  newUIItem.classList = 'shop-item card col px-0 shadow-sm';
  // newUIItem.classList.add('shop-item', 'card', 'col', 'px-0', 'shadow-sm');
  newUIItem.innerHTML = `<img
                src=${item.image}
                class='shop-item-image card-img-top'
                alt='...'
              />
              <div class='card-body d-flex flex-column'>
                <h5 class='shop-item-title card-title fs-6'>${item.title}</h5>
                <p class='shop-item-price card-text fs-6'>${item.price}</p>
                <div class="text-center mt-auto">
                  <button class='btn btn-dark shop-item-button px-3'>
                    Add to cart <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>`;
  lastestItemsContainer.appendChild(newUIItem);
}

function showProductsToUI() {
  // show spinner at initial
  document.querySelector(
    '.latest-container'
  ).innerHTML = `<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

  fetch('https://fakestoreapi.com/products?limit=3')
    .then((res) => res.json())
    .then((products) => {
      // add item to UI
      document.querySelector('.spinner-border').remove();
      products.forEach((product) => {
        showItemtoList(product);
      });

      // add to cart
      var addToCartButtons = document.querySelectorAll('.shop-item-button');

      addToCartButtons.forEach((button) => {
        button.addEventListener('click', handleAddToCart);
      });
    })
    .catch((error) => console.log(error));
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
    if (cartItemNames[i].textContent == title) {
      console.log('same');
      alert('Item already added');
      return;
    }
  }

  const cartRowContent = `<div class='cart-item row justify-content-between align-items-center border py-3 px-1 fs-6'>
                            <div class='col-2'>
                                <img class='cart-img img-fluid' src=${img} alt='' />
                            </div>
                            <div class='col-6'>
                                <p class='cart-item-title pb-0'>${title}</p>
                                <p class='cart-price text-secondary pb-0'>${price}</p>
                            </div>
                            <div class='col-2'>
                                <input class='cart-quantity-input' type='number' min='1' value='1' />
                            </div>
                            <div class="col-1 text-center">
                                <button class="cart-remove btn btn-danger btn-sm text-center rounded-full">
                                  <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.appendChild(cartRow);
  // show bootstrap toast
  const toast = new bootstrap.Toast(document.querySelector('#notification'));
  toast.show();

  // show cart
  const bsOffcanvas = new bootstrap.Offcanvas('#cart-sidebar');
  bsOffcanvas.show();

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
