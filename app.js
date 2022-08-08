const removeItemButtons = document.querySelectorAll('.btn-danger');

window.addEventListener('DOMContentLoaded', () => {
  removeItemButtons.forEach((button) => {
    button.addEventListener('click', removeItem);
  });
});

function removeItem(event) {
  btnClicked = event.target;
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
  document.querySelector('.cart-total-price').textContent = total;
  alert('Item removed!');
}
