/* бургер */

document.getElementById('open-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.add('burger--opened');
});

document.getElementById('close-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.remove('burger--opened');
});
