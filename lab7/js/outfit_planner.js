function createOutfitItem(event) {
    event.preventDefault();

    const outfitName = document.getElementById('outfit-name').value;
    const occasion = document.getElementById('occasion').value;
    const outfitDescription = document.getElementById('outfit-description').value;

    const outfitList = document.getElementById('outfit-list');
    const outfitItem = document.createElement('div');
    outfitItem.classList.add('outfit-item');

    outfitItem.innerHTML = `
    <h3>${outfitName}</h3>
    <p><strong>Стиль:</strong> ${occasion}</p>
    <p>${outfitDescription}</p>
    <button class="edit-button" onclick="editOutfit(this)">Изменить</button>
    <button class="delete-button" onclick="deleteOutfit(this)">Удалить</button>`;

    outfitList.appendChild(outfitItem);
    document.getElementById('outfit-form').reset(); //Очищение формы
    saveOutfit(outfitName, occasion, outfitDescription);

  // Уведомление о создании
  Toastify({
    text: "Образ успешно запланирован!",
    duration: 3000, // Время отображения в мс
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: '#618e05' ,
      color: '#fff'
    },
  }).showToast();
}

function saveOutfit(name, occasion, description) {
    let outfits = getSavedOutfits();
    outfits.push({ name, occasion, description });
    localStorage.setItem('outfits', JSON.stringify(outfits));
}

function getSavedOutfits() {
    const storedOutfits = localStorage.getItem('outfits');
    if (storedOutfits) {
        return JSON.parse(storedOutfits);
    } else {
        return [];
    }
}

function loadSavedOutfits() {
    const savedOutfits = getSavedOutfits();
    savedOutfits.forEach(outfit => {
        const outfitItem = document.createElement('div');
        outfitItem.classList.add('outfit-item');

        outfitItem.innerHTML = `
      <h3>${outfit.name}</h3>
      <p><strong>Стиль:</strong> ${outfit.occasion}</p>
      <p>${outfit.description}</p>
      <button class="edit-button" onclick="editOutfit(this)">Изменить</button>
      <button class="delete-button" onclick="deleteOutfit(this)">Удалить</button>`;

        document.getElementById('outfit-list').appendChild(outfitItem);
    });
}

function editOutfit(button) {
    const outfitItem = button.parentElement;
    outfitItem.querySelectorAll('h3, p').forEach(el => {
        el.contentEditable = true;
        el.classList.add('editing');
    });
    button.style.display = 'none';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.classList.add('save-button');
    saveButton.onclick = () => saveEditedOutfit(outfitItem, saveButton);
    outfitItem.appendChild(saveButton);
}

function saveEditedOutfit(outfitItem, saveButton) {
    const name = outfitItem.querySelector('h3').textContent;
    const occasion = outfitItem.querySelector('p:first-of-type strong').nextSibling.textContent;
    const description = outfitItem.querySelector('p:last-of-type').textContent;

    // Обновление данных образа в localStorage
    updateOutfitInStorage(name, occasion, description);

    // Отключение редактирование
    outfitItem.querySelectorAll('h3, p').forEach(el => {
        el.contentEditable = false;
        el.classList.remove('editing');
    });
    saveButton.remove();

    // Показывает кнопку редактирования
    const editButton = outfitItem.querySelector('.edit-button');
    editButton.style.display = 'inline-block';

  // Уведомление об изменении
    Toastify({
      text: "Образ '" + name + "' успешно изменен!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: '#594e40',
        color: '#fff'
      },
    }).showToast();
}

function updateOutfitInStorage(newName, newOccasion, newDescription) {
    const outfitName = newName;
    let outfits = getSavedOutfits();
    const outfitIndex = outfits.findIndex(outfit => outfit.name === outfitName);
    if (outfitIndex !== -1) {
        outfits[outfitIndex] = { name: newName, occasion: newOccasion, description: newDescription };
        localStorage.setItem('outfits', JSON.stringify(outfits));
    }
}

function deleteOutfit(button) {
  const outfitItem = button.parentElement;
  const outfitName = outfitItem.querySelector('h3').textContent; // Получаем имя образа

  // Подтверждение удаления с помощью Toastify
  if (confirm("Вы уверены, что хотите удалить образ '" + outfitName + "'?")) {
    outfitItem.remove();

    // Удаление из localStorage
    let outfits = getSavedOutfits();
    outfits = outfits.filter(outfit => outfit.name !== outfitName);
    localStorage.setItem('outfits', JSON.stringify(outfits));

    // Уведомление об удалении
    Toastify({
      text: "Образ '" + outfitName + "' удален!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: '#8e2f23',
        color: '#fff'
      },
    }).showToast();
  }
}


window.onload = () => {
    loadSavedOutfits();
};

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000)
}
