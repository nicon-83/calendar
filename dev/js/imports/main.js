;"use strict";
var addBtn = document.getElementById('add_calendar'),
	 removeBtn = document.createElement('button');
	 calendarContainer = document.querySelector('.for_new_calendars'),
	 descriptionContainer = document.querySelector('.description'),
	 count = 0;

addBtn.addEventListener('click', addCalendar);

removeBtn.addEventListener('click', removeCalendar);

function addCalendar(){
	count++;
	var parentElem = document.createElement('div');
	parentElem.classList.add('new_calendar');
	parentElem.setAttribute('id', 'calendar_parent_' + count);
	calendarContainer.appendChild(parentElem);
	new Calendar({
		parentElem: parentElem,
		width: '100%',
		numberBgImg: 8,
		idImgWrap: 'img_wrap_' + count,
		idCalendarWrap: 'calendar_wrap_' + count,
		idPrevBtn: 'prev_' + count,
		idNextBtn: 'next_' + count,
		idLink: 'link_' + count,
		idDayOfWeek: 'day_of_week_table_' + count,
		idDateTable: 'date_table_' + count,
		idMonthTable: 'month_table_' + count,
		idYearTable: 'year_table_' + count,
		idYearRangeTable: 'year_range_table_' + count
	});
	if (count == 1) {
		removeBtn.setAttribute('id', 'remove_calendar');
		removeBtn.innerHTML = 'удалить календарь';
		descriptionContainer.appendChild(removeBtn);
	};
}

function removeCalendar(){
	count--;
	var lastCalendar = calendarContainer.lastElementChild;
	calendarContainer.removeChild(lastCalendar);
	if (count == 0) {
		descriptionContainer.removeChild(removeBtn);
	}
}

$('.works').addPopUp({
		popUpWindowClass: 'my_works',
		parentLinksSelector: '.works a',
		containerSelector: '.wrapper',
		nodes: [
			'<div><a href="../calculator/index.html">Калькулятор на javascript</a><span> | </span><a href="https://github.com/nicon-83/calculator.git">GitHub</a></div>',
			'<div><a href="../trafficLight/index.html">Светофор на javascript</a><span> | </span><a href="https://github.com/nicon-83/traffic_light.git">GitHub</a></div>',
			'<div><a href="../index.html">Свадебные плакаты</a><span> | </span><a href="https://github.com/nicon-83/wedding_posters.git">GitHub</a></div>'
		]
	});