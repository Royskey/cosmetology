/**
 * Косметологическая клиника — общие скрипты
 * Бургер-меню, анимация появления при скролле (оптимизировано для INP)
 */

// ---------- Бургер-меню (работает на всех страницах) ----------
(function initBurgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.getElementById('burgerBtn');
        const navMenu = document.getElementById('navMenu');

        if (!burger || !navMenu) return;

        // Функция закрытия меню
        const closeMenu = () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        };

        // Открытие/закрытие по клику на бургер
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие при клике на ссылку в меню
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Закрытие при клике вне меню (опционально)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !burger.contains(e.target)) {
                closeMenu();
            }
        });
    });
})();

// ---------- Анимация появления элементов при скролле (оптимизировано для INP) ----------
(function initScrollAnimation() {
    document.addEventListener('DOMContentLoaded', () => {
        // Элементы, которые будут анимироваться
        const animatedItems = document.querySelectorAll(
            '.service-card, .service-item, .page-title, .btn-telegram, ' +
            '.address-detail, .map-container, .directions, .contact-card'
        );

        if (animatedItems.length === 0) return;

        // Оптимизированный IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            // Используем requestAnimationFrame для плавности и снижения нагрузки на поток
            requestAnimationFrame(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // отключаем наблюдение после появления
                    }
                });
            });
        }, {
            threshold: 0.15,                 // 15% элемента – чуть раньше
            rootMargin: '0px 0px 80px 0px'   // Запускаем за 80px до появления
        });

        animatedItems.forEach(item => observer.observe(item));
    });
})();

// ---------- Подсветка активного пункта меню ----------
function setActiveMenuItem() {
    // Получаем имя текущего файла (например, "index.html", "services.html")
    let currentFile = window.location.pathname.split('/').pop();
    if (currentFile === '' || currentFile === '/') currentFile = 'index.html';
    
    // Получаем все ссылки меню
    const menuLinks = document.querySelectorAll('.nav a');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Убираем возможные якоря (?)
        const linkFile = href.split('/').pop().split('#')[0];
        
        if (linkFile === currentFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', setActiveMenuItem);