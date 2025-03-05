// хедер
function toggleMenu() {
    var menu = document.getElementById("menu");
    var banners = document.getElementById("baners");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        banners.style.transform = "translateX(0)";
    } else {
        menu.style.display = "block";
        banners.style.transform = "translateX(0px)"; // Зміщення банерів вправо
    }
}

// Закриває меню при кліку поза ним
document.addEventListener("click", function(event) {
    var menu = document.getElementById("menu");
    var toggle = document.querySelector(".menu-toggle");
    var banners = document.getElementById("banners");

    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.style.display = "none";
        banners.style.transform = "translateX(0)";
    }
});

// header scroll
window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    if (window.scrollY > 50) { 
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});




document.querySelector(".dropdown-submenu a").addEventListener("click", function (e) {
    e.preventDefault();
    let submenu = this.nextElementSibling;
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
});


// скол каталог
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".carousel-container");

    sections.forEach((section) => {
        const container = section.querySelector(".product-grid");
        const prevBtn = section.querySelector(".carousel-prev");
        const nextBtn = section.querySelector(".carousel-next");
        const scrollAmount = 200; // На скільки пікселів прокручувати

        if (!container || !prevBtn || !nextBtn) return;

        prevBtn.addEventListener("click", () => {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        nextBtn.addEventListener("click", () => {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
});


// пошук
const searchBox = document.querySelector('.search-box');
const productCards = document.querySelectorAll('.product-card');

searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    productCards.forEach(card => {
        // Перевіряємо всі <p> елементи в картці
        const productDescription = Array.from(card.querySelectorAll('p'))
            .map(p => p.textContent.toLowerCase())  // Отримуємо текст з усіх <p>
            .join(' ');  // Об'єднуємо текст в один рядок

        if (productDescription.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});




 // імпути спосіб доставки
function toggleDeliveryFields(method) {
    // Сховати або показати поля для Нової Пошти
    document.getElementById('nova-poshta-fields').style.display = method === 'nova-poshta' ? 'block' : 'none';
    
    // Сховати або показати поля для Укрпошти
    document.getElementById('ukrposhta-fields').style.display = method === 'ukrposhta' ? 'block' : 'none';
}


document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener("change", function () {
        // Ховаємо всі деталі оплати
        document.getElementById("account-details").style.display = "none";

        // Показуємо лише вибраний спосіб
        if (this.value === "account") {
            document.getElementById("account-details").style.display = "block";
        }
    });
});   