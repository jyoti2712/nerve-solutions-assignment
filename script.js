const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
    {
        View: 'Bullish',
        Value: {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call'],
            '09-May-2024': []
        }
    },
    {
        View: 'Bearish',
        Value: {
            '24-Apr-2024': ['Bear Call Spread', 'Long Put'],
            '31-May-2024': ['Long Put'],
            '21-Jun-2024': ['Bear Put Spread']
        }
    }
];

const toggleButtons = document.querySelectorAll('.toggle button');
const dropdown = document.getElementById('date-dropdown');
const cardsContainer = document.getElementById('cards-container');
const emptyState = document.getElementById('empty-state');

let selectedView = 'Bullish';

function populateDropdown() {
    dateArray.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dropdown.appendChild(option);
    });
}

function renderCards(view, date) {
    const viewData = strategyArray.find(item => item.View === view);
    const strategies = viewData?.Value[date] || [];

    cardsContainer.innerHTML = '';
    if (strategies.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const strategyCounts = strategies.reduce((acc, strategy) => {
        acc[strategy] = (acc[strategy] || 0) + 1;
        return acc;
    }, {});

    Object.entries(strategyCounts).forEach(([strategy, count]) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<strong>${strategy}</strong><br>${count} ${count > 1 ? 'Strategies' : 'Strategy'}`;
        cardsContainer.appendChild(card);
    });
}

function addEventListeners() {
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedView = button.dataset.view;
            renderCards(selectedView, dropdown.value);
        });
    });

    dropdown.addEventListener('change', () => {
        renderCards(selectedView, dropdown.value);
    });
}

function initialize() {
    populateDropdown();
    addEventListeners();
    renderCards(selectedView, dateArray[0]);
}

initialize();