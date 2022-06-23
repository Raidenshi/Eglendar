let calNav = 0;
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
``;
const today = new Date().getDate();
const calendar = document.getElementById('calendar-table');
const container = document.querySelector('.container');
const eventSchedule = document.querySelector('.event-schedule');

function init() {
  const date = new Date();

  if (calNav != 0) {
    date.setMonth(new Date().getMonth() + calNav);
  }

  const month = date.getMonth();
  const year = date.getFullYear();

  const lastDayLastMonth = new Date(year, month, 0).getDate();
  const daysThisMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMonth = new Date(year, month, 1).toLocaleDateString('en-uk', {
    weekday: 'long',
  });
  const renderDaysLastMonth = weekdays.indexOf(firstDayMonth);

  document.querySelector(
    '.display-date'
  ).innerHTML = `<span>${date.toLocaleString('en-uk', {
    month: 'long',
  })}</span> ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= 42; i++) {
    const calendarCell = document.createElement('div');
    calendarCell.classList.add('table-day');

    if (i <= renderDaysLastMonth) {
      calendarCell.classList.add('previous');
      calendarCell.innerText = lastDayLastMonth - renderDaysLastMonth + i;
    } else if (i - renderDaysLastMonth > daysThisMonth) {
      calendarCell.classList.add('next');
      calendarCell.innerText = i - daysThisMonth - renderDaysLastMonth;
    } else {
      calendarCell.innerText = i - renderDaysLastMonth;
    }

    if (i - renderDaysLastMonth == today && calNav == 0)
      calendarCell.classList.add('today');

    calendar.classList.remove('hidden');
    calendar.appendChild(calendarCell);
  }
}

function changeMonthButtons() {
  document.getElementById('next-btn').addEventListener('click', () => {
    calNav++;
    calendar.classList.add('hidden');
    setTimeout(() => {
      init();
    }, 130);
  });
  document.getElementById('previous-btn').addEventListener('click', () => {
    calNav--;
    calendar.classList.add('hidden');
    setTimeout(() => {
      init();
    }, 130);
  });
}

function openEventWindow() {
  calendar.addEventListener('click', (e) => {
    if (clicked) clicked.style.border = '';
    if (e.target.classList.contains('calendar-table')) return;

    container.style.transform = 'translateX(-200px)';
    eventSchedule.style.transform = 'translateX(500px)';
    clicked = e.target;
    e.target.style.border = '2px solid #d42c2c';
  });
}

function closeEventWindow() {
  document.querySelector('.close-event').addEventListener('click', () => {
    container.style.transform = '';
    eventSchedule.style.transform = '';
    clicked.style.border = '';
    clicked = null;
  });
}

openEventWindow();
closeEventWindow();
changeMonthButtons();
init();
