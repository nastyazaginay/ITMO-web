const description = document.querySelector('.header__description');
const showMoreButton = document.querySelector('.header__show-more');

description.style.maxHeight = '5px';
description.style.overflow = 'hidden';

showMoreButton.addEventListener('click', () => {
  if (description.style.maxHeight === '5px') {
    description.style.maxHeight = 'none';
    showMoreButton.textContent = 'Скрыть описание';
  } else {
    description.style.maxHeight = '5px';
    showMoreButton.textContent = 'Показать описание';
  }
});
