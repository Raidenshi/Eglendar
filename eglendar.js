let calNav = 0;
let clicked = null;
let clickedDate = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

let date;
let month;
let year;

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const today = new Date().getDate();
const calendar = document.getElementById('calendar-table');
const container = document.querySelector('.container');
const eventSchedule = document.querySelector('.event-schedule');
const closeEvent = document.querySelector('.close-event');
const createEvent = document.querySelector('.create-event');
const addEvent = document.forms[0];
const eventList = document.querySelector('.schedule-container');

function init() {
  date = new Date();

  if (calNav != 0) {
    date.setMonth(new Date().getMonth() + calNav);
  }

  month = date.getMonth();
  year = date.getFullYear();

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

function initButtons() {
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

  calendar.addEventListener('click', openEventWindow);

  closeEvent.addEventListener('click', closeEventWindow);

  createEvent.addEventListener('click', displayCreateEventForm);

  addEvent.addEventListener('submit', (e) => {
    e.preventDefault();
    events.push({
      date: clickedDate,
      time: addEvent[0].value,
      text: addEvent[1].value,
    });
    localStorage.setItem('events', JSON.stringify(events));
    refreshEventList(events);
  });
}

function openEventWindow(e) {
  closeCreateEventForm();
  if (e.target.classList.contains('calendar-table')) return;
  if (clicked) clicked.style.border = '';

  clicked = e.target;
  let clickedMonth = null;
  if (clicked.classList.contains('next')) {
    clickedMonth = month + 1;
  } else if (clicked.classList.contains('previous')) {
    clickedMonth = month - 1;
  } else clickedMonth = month;

  clickedDate = `${clicked.innerText}/${clickedMonth}/${year}`;
  refreshEventList(events);

  container.style.transform = 'translateX(-200px)';
  eventSchedule.style.transform = 'translateX(500px)';
  e.target.style.border = '2px solid #d42c2c';
}

function closeEventWindow() {
  container.style.transform = '';
  eventSchedule.style.transform = '';
  clicked.style.border = '';
  clicked = null;
  closeCreateEventForm();
}

function displayCreateEventForm() {
  document.forms[0].style.display = 'block';
  createEvent.style.display = 'none';
}

function closeCreateEventForm() {
  document.forms[0].style.display = '';
  createEvent.style.display = '';
}

function refreshEventList(events) {
  eventList.classList.add('hidden');
  setTimeout(function () {
    eventList.innerHTML = '';
    const eventsThisDay = events.filter((el) => el.date == clickedDate);
    eventsThisDay.sort(function (a, b) {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      return 0;
    });
    eventsThisDay.forEach((el) => {
      let element = document.createElement('li');
      element.innerHTML = `<span>${el.time}</span>${el.text}`;
      eventList.appendChild(element);
    });
    eventList.classList.remove('hidden');
  }, 130);
}

initButtons();
init();
