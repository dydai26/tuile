 // Функція для отримання ціни за метр з елемента .price
function getPricePerMeter() {
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        // Витягуємо значення ціни та перетворюємо його на число
        return parseFloat(priceElement.textContent.replace(' грн/м', '').trim());
    }
    return 0; // Значення за замовчуванням, якщо ціна не знайдена
}

// Основна функція для розрахунку ціни
function calculatePrice() {
    const width = parseFloat(document.getElementById('length').value) || 0; // Ширина тюля
    const height = parseFloat(document.getElementById('height').value) || 0; // Висота тюля
    const ribbonPricePerMeter = 10; // Ціна за метр стрічки
    const workCostPerMeter = 30; // Вартість роботи за метр

    // Отримуємо ціну за метр тюля з HTML
    const pricePerMeter = getPricePerMeter();

    if (width > 0 && height > 0) {
        // Розрахунок загальної вартості
        const tulleCost = pricePerMeter * width; // Ціна тюля (за ширину)
        const ribbonCost = ribbonPricePerMeter * width; // Ціна стрічки (за ширину)
        const workCost = workCostPerMeter * width; // Ціна роботи (за ширину)

        const totalPrice = tulleCost + ribbonCost + workCost;

        
        // Оновлюємо DOM, видаляючи зайві нулі після коми
        document.getElementById('modal-price').textContent = `${pricePerMeter.toFixed(2).replace(/\.00$/, '')} грн`;
        document.getElementById('total-price').innerHTML = `<strong>Загальна вартість:</strong> ${totalPrice.toFixed(2).replace(/\.00$/, '')} грн`;
    } else {
        // Помилка, якщо ширина або висота не вказані
        document.getElementById('total-price').innerHTML = '<strong>Загальна вартість:</strong> -- грн';
        alert('Будь ласка, введіть ширину і висоту тюля!');
    }
}

// Додаткова функція для обробки Enter
function handleEnter(event) {
    if (event.key === 'Enter') {
        calculatePrice();
    }
}



// Обробник для кнопки "Добавити в кошик"
function addToCart() {
    // Збираємо дані з модального вікна
    const imageUrl = document.getElementById('main-image') ? document.getElementById('main-image').src : ''; // отримуємо src зображення
    const article = document.querySelector('.product-code') ? document.querySelector('.product-code').textContent.replace('Артикул: ', '') : ''; // отримуємо артикул
    const width = document.getElementById('length') ? document.getElementById('length').value : ''; // отримуємо ширину
    const height = document.getElementById('height') ? document.getElementById('height').value : ''; // отримуємо висоту
    const totalPrice = document.getElementById('total-price') ? document.getElementById('total-price').textContent.replace('Загальна вартість:', '').trim() : ''; // отримуємо загальну вартість

    // Перевірка на відсутність обов'язкових даних
    if (!imageUrl || !article || !width || !height || !totalPrice || width <= 0 || height <= 0) {
        alert("Будь ласка, заповніть всі поля перед додаванням товару.");
        return;
    }

    // Формуємо URL з параметрами для передачі на сторінку кошика
    const url = `basket.html?image=${encodeURIComponent(imageUrl)}&article=${encodeURIComponent(article)}&width=${width}&height=${height}&totalPrice=${encodeURIComponent(totalPrice)}`;

    // Перехід на сторінку кошика
    window.location.href = url;
}





function addToCart2() {
    // Збираємо дані з модального вікна
    const imageUrl = document.getElementById('main-image') ? document.getElementById('main-image').src : ''; // отримуємо src зображення
    const article = document.querySelector('.product-code') ? document.querySelector('.product-code').textContent.replace('Артикул: ', '') : ''; // отримуємо артикул
    const width = document.getElementById('length') ? document.getElementById('length').value : ''; // отримуємо ширину
    
    const totalPrice = document.getElementById('total-price') ? document.getElementById('total-price').textContent.replace('Загальна вартість:', '').trim() : ''; // отримуємо загальну вартість

    // Висота встановлюється сталим значенням 1
    const height = 1;

    // Перевірка на відсутність обов'язкових даних
    if (!imageUrl || !article || !width || !totalPrice || width <= 0) {
        alert("Будь ласка, заповніть всі поля перед додаванням товару.");
        return;
    }

    // Формуємо URL з параметрами для передачі на сторінку кошика
    const url = `basket.html?image=${encodeURIComponent(imageUrl)}&article=${encodeURIComponent(article)}&width=${width}&height=${height}&totalPrice=${encodeURIComponent(totalPrice)}`;

    // Перехід на сторінку кошика
    window.location.href = url;
}



