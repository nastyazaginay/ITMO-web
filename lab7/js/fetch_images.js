document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.gallery-container');
  const preloader = document.createElement('div');
  preloader.classList.add('preloader');
  preloader.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
  galleryContainer.insertAdjacentElement('beforebegin', preloader);


  let requestCounter = 0;

  fetchPhotos(200)
    .then(photos => {
      const randomPhotos = getRandomSubset(photos, 10);
      renderPhotos(randomPhotos);
    })
    .catch(error => handleError(error));


  function fetchPhotos() {
    // функция инициализирует запрос к JSONPlaceholder с помощью fetch
    const limit = 10;
    const offset = requestCounter * limit;
    requestCounter++;

    const url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${offset}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
  }

  function getRandomSubset(array, count) {
    if (count > array.length) {
      return array;
    }
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


  function renderPhotos(photos) {
    // функция отображает данные на странице
    preloader.remove();
    photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.title;
      img.classList.add('gallery-image');
      galleryContainer.appendChild(img);
    });
  }

  function handleError(error) {
    // функция для обработки ошибки
    preloader.remove();
    const errorElement = document.createElement('p');
    errorElement.textContent = '⚠ Что-то пошло не так... :(';
    errorElement.classList.add('error');
    galleryContainer.insertAdjacentElement('beforebegin', errorElement);
    console.error("Error fetching photos:", error);
  }
});


