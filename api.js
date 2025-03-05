document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city');
  const citySuggestions = document.getElementById('city-suggestions');
  const branchSelect = document.getElementById('branch-select');
  const novaPoshtaApiKey = '8643b96da48f6845a36edd4376d965e0';

  // Пошук міст
  cityInput.addEventListener('input', () => {
    const query = cityInput.value.trim();
    if (query.length < 2) return;

    // Виклик API для пошуку міст
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: novaPoshtaApiKey,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: { FindByString: query }
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showCitySuggestions(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  });

  // Відображення підказок міст
  function showCitySuggestions(cities) {
    citySuggestions.innerHTML = ''; // Очистити список
    citySuggestions.style.display = 'block'; // Показати список підказок

    cities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city.Description;
      li.dataset.cityRef = city.Ref; // Додаємо Ref міста як data-атрибут
      li.addEventListener('click', () => {
        cityInput.value = city.Description;
        citySuggestions.innerHTML = ''; // Очищаємо список після вибору
        citySuggestions.style.display = 'none'; // Приховуємо список підказок
        loadWarehouses(city.Ref); // Завантажуємо відділення для обраного міста
      });
      citySuggestions.appendChild(li);
    });
  }

  // Завантаження відділень на основі вибраного міста
  function loadWarehouses(cityRef) {
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: novaPoshtaApiKey,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: { CityRef: cityRef }
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          branchSelect.innerHTML = '<option value="">Оберіть відділення</option>'; // Очищення списку відділень
          data.data.forEach(warehouse => {
            const option = document.createElement('option');
            option.value = warehouse.Ref; // Використовуємо Ref для відділення
            option.textContent = warehouse.Description;
            branchSelect.appendChild(option);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching warehouses:', error);
      });
  }
});