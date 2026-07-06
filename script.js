// Исходные данные
const items = [
    {
        id: 1,
        title: "Разработка умных таблиц в Excel",
        desc: "Создание комплексных таблиц с нуля. Настройка сложных формул (VLOOKUP, XLOOKUP, INDEX/MATCH), условий и форматирования для бизнес-отчетов.",
        cat: "excel"
    },
    {
        id: 2,
        title: "Очистка и структурирование данных",
        desc: "Удаление дубликатов, исправление ошибок форматирования, разбивка текста по столбцам и приведение разрозненных массивов данных к единому стандарту.",
        cat: "clean"
    },
    {
        id: 3,
        title: "Автоматизация рутины (Макросы VBA)",
        desc: "Написание скриптов для автоматического импорта/экспорта файлов, генерации отчетов по нажатию одной кнопки и объединения множества таблиц в одну.",
        cat: "macro"
    },
    {
        id: 4,
        title: "Интеграция баз данных и слияние таблиц",
        desc: "Сопоставление данных из разных источников, связывание справочников, консолидация информации для последующего глубокого анализа.",
        cat: "excel"
    }
];

const catalog = document.getElementById('catalog');
const search = document.getElementById('search');
const buttons = document.querySelectorAll('.cats .btn');
const form = document.getElementById('main-form');
const success = document.getElementById('success');

function render(data) {
    catalog.innerHTML = '';
    
    if (data.length === 0) {
        catalog.innerHTML = '<p>Ничего не найдено</p>';
        return;
    }

    data.forEach(el => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <h4>${el.title}</h4>
            <p>${el.desc}</p>
            <span class="badge">${el.cat}</span>
        `;
        catalog.appendChild(div);
    });
}

// Показ при старте
render(items);

function filterData() {
    const text = search.value.toLowerCase();
    const activeBtn = document.querySelector('.cats .btn.active');
    const category = activeBtn.getAttribute('data-cat');

    const filtered = items.filter(el => {
        const matchesSearch = el.title.toLowerCase().includes(text) || el.desc.toLowerCase().includes(text);
        const matchesCat = category === 'all' || el.cat === category;
        return matchesSearch && matchesCat;
    });

    render(filtered);
}

search.addEventListener('input', filterData);

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        buttons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterData();
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'block';
});