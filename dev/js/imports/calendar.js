;"use strict";
var Calendar = function (settings){
	var nowDate = new Date(),
		 currentDate = nowDate.getDate(),
		 curMonth = nowDate.getMonth(),
		 currentMonth = nowDate.getMonth(),
		 curYear = nowDate.getFullYear(),
		 currentYear = nowDate.getFullYear(),
		 lastDate = (new Date(currentYear, currentMonth+1, 0)).getDate(),
		 prevBtn,
		 nextBtn,
		 a,
		 dayOfWeek,
		 bgImgWrapper,
		 tableWrapper,
		 dateTable,
		 monthTable,
		 yearTable,
		 yearRangeTable,
		 numberStringOfMonth = 3,/*при изменении необходимо в стилях подгонять размер .wrapper*/
		 yearRange = 9, /*диапазон должен быть кратен числу строк иначе таблица будет неполной*/
		 numberStringOfYear = 3,
		 minYear = 1600;/*минимальный год календаря*/
		 maxYear = 2400;/*максимальный год календаря*/
		 numBgImg = settings.numberBgImg,/*количество фоновых изображений, расширение - .png, формат имени 1.png 2.png 3.png ...*/
		 weekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		 months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		 monthNames = {'Январь': 0, 'Февраль': 1, 'Март': 2, 'Апрель': 3, 'Май': 4, 'Июнь': 5, 'Июль': 6, 'Август': 7, 'Сентябрь': 8, 'Октябрь': 9, 'Ноябрь': 10, 'Декабрь': 11};

	createCalendarBody(settings);

	getElem(settings);

	setBgImgWrapperWidth(settings);

	createDateTable(settings);

	prevBtn.addEventListener('click', function (e){
		getElem(settings);

		if (dateTable) {
			switchMonth(e.target.id, settings);
		}

		if (monthTable) {
			switchYear(e.target.id, settings);
		}

		if (yearTable) {
			switchRangeYear(e.target.id, settings)
		}

		if (yearRangeTable) {
			switchRangeRangeYear(e.target.id, settings)
		}
	});

	nextBtn.addEventListener('click', function (e){
		getElem(settings);

		if (dateTable) {
			switchMonth(e.target.id, settings);
		}

		if (monthTable) {
			switchYear(e.target.id, settings);
		}

		if (yearTable) {
			switchRangeYear(e.target.id, settings)
		}

		if (yearRangeTable) {
			switchRangeRangeYear(e.target.id, settings)
		}
	});

	a.addEventListener('click', function(e){
		getElem(settings);

		if (dateTable) {
			showMonthTable(settings);
		}

		if (monthTable) {
			showYearTable(+e.target.textContent, settings);
		}

		if (yearTable) {
			var temp = e.target.textContent.split('-');
			showYearRangeTable(+temp[0], settings);
		}
	});

	tableWrapper.addEventListener('click', function(e){
		getElem(settings);

		if (e.target.tagName == 'TD' && monthTable) {
			setMonth(e.target, settings);
		}

		if (e.target.tagName == 'TD' && yearTable){
			setYear(e.target, settings);
		}

		if (e.target.tagName == 'TD' && yearRangeTable){
			setYearRange(e.target, settings);
		}
	});

	function createCalendarBody(object) {
		var imgWrap = document.createElement('div');
		imgWrap.classList.add('bg_img_wrapper');
		imgWrap.setAttribute('id', object.idImgWrap);
		object.parentElem.appendChild(imgWrap);

		var calendarWrap = document.createElement('div');
		calendarWrap.classList.add('calendar_wrapper');
		calendarWrap.setAttribute('id', object.idCalendarWrap);
		imgWrap.appendChild(calendarWrap);

		var prevBtn = document.createElement('button');
		prevBtn.classList.add('prevBtn');
		prevBtn.setAttribute('id', object.idPrevBtn);
		prevBtn.innerHTML = '<';
		calendarWrap.appendChild(prevBtn);

		var nextBtn = document.createElement('button');
		nextBtn.classList.add('nextBtn');
		nextBtn.setAttribute('id', object.idNextBtn);
		nextBtn.innerHTML = '>';
		calendarWrap.appendChild(nextBtn);

		var aWrap = document.createElement('div');
		aWrap.classList.add('a_wrap');
		var a = document.createElement('a');
		a.setAttribute('id', object.idLink);
		a.setAttribute('href', '#');
		a.innerHTML = 'Month Year';
		a.textContent = months[currentMonth] + ' ' + currentYear;
		aWrap.appendChild(a);
		calendarWrap.appendChild(aWrap);

		var weekDaysTable = document.createElement('table');
		weekDaysTable.classList.add('day_off_week');
		weekDaysTable.setAttribute('id', object.idDayOfWeek);
		var tr = document.createElement('tr');
		for (var i = 0; i < weekDays.length; i++) {
			var th = document.createElement('th');
			th.innerHTML = weekDays[i];
			tr.appendChild(th);
		}
		weekDaysTable.appendChild(tr);
		calendarWrap.appendChild(weekDaysTable);
	}

	function getElem(object) {
		bgImgWrapper = document.getElementById(object.idImgWrap);
		tableWrapper = document.getElementById(object.idCalendarWrap);
		prevBtn = document.getElementById(object.idPrevBtn);
		nextBtn = document.getElementById(object.idNextBtn);
		a = document.getElementById(object.idLink);
		dayOfWeek = document.getElementById(object.idDayOfWeek);
		dateTable = document.getElementById(object.idDateTable);
		monthTable = document.getElementById(object.idMonthTable);
		yearTable = document.getElementById(object.idYearTable);
		yearRangeTable = document.getElementById(object.idYearRangeTable);
	}

	function createDateTable(object) {
		var d = new Date(currentYear, currentMonth, 1);
		var dayOfWeek = d.getDay() - 1;
		if (dayOfWeek < 0) {
			dayOfWeek = 6;
		}
		var weekNum = 0;
		var table = document.createElement('table');
		table.classList.add('date_table');
		table.setAttribute('id', object.idDateTable);

		while( currentMonth == d.getMonth() ) {

		var tr = document.createElement('tr');

			for (var i = 0; i < 7; i++) {

				var td = document.createElement('td');

				if (parseFloat(getComputedStyle(bgImgWrapper).width) < 300){
					td.style.height = '18px';
				}

				if (i == 5 || i == 6) {
				td.classList.add('day_off');
				}
				if (weekNum == 0) {
					if (i < dayOfWeek) {
						td.innerHTML = '';
						td.classList.add('empty');
					} else {
						td.innerHTML = d.getDate();
						if (td.textContent == currentDate && curMonth == currentMonth && curYear == currentYear) {
							td.classList.add('current_date');
						}
						d.setDate(d.getDate() + 1);
					}
				} else {
					td.innerHTML = d.getDate();
					if (td.textContent == currentDate && curMonth == currentMonth && curYear == currentYear) {
						td.classList.add('current_date');
					}
					if (d.getDate() == lastDate){
						tr.appendChild(td);
						d.setDate(d.getDate() + 1);
						break;
					}
					d.setDate(d.getDate() + 1);
				}

				tr.appendChild(td);
			}

			table.appendChild(tr);
			weekNum++;
		}

		tableWrapper.appendChild(table);
		setFontSize();
		setBgImgWrapperMinHeight(table.children[0]);
		bgImgWrapper.style.backgroundImage = 'url(./img/' + getRandomNum(1, object.numberBgImg) + '.png)';
	}

	function createMonthTable (object) {
		var d = new Date(currentYear, 0, 1);
		var dMonth = d.getMonth();
		var dYear = d.getFullYear();
		var table = document.createElement('table');
		table.classList.add('month_table');
		table.setAttribute('id', object.idMonthTable);

		while (dYear == currentYear) {

			var tr = document.createElement('tr');

			for (var i = 0; i < months.length/numberStringOfMonth; i++) {
				var td = document.createElement('td');
				if (dMonth == curMonth && curYear == currentYear){
				td.classList.add('current_month');
				}
				td.innerHTML = months[dMonth];
				tr.appendChild(td);
				dMonth += 1;
			}

			table.appendChild(tr);
			if (dMonth == months.length){
					dYear += 1;
				}
		}
		tableWrapper.appendChild(table);
	}

	function createYearTable (year, object){
		var firstYear = year;
		var lastYear = year + (yearRange - 1);
		var table = document.createElement('table');
		table.classList.add('year_table');
		table.setAttribute('id', object.idYearTable);

		while (firstYear <= lastYear) {
			var tr = document.createElement('tr');

			for (var i = 0; i < yearRange/numberStringOfYear; i++) {
				var td = document.createElement('td');
				td.innerHTML = firstYear;
				if (td.textContent == curYear){
					td.classList.add('current_year');
				}
				tr.appendChild(td);
				firstYear += 1;
				if (firstYear > lastYear) {
					break;
				}
			}
			table.appendChild(tr);
		}
		tableWrapper.appendChild(table);
	}

	function createYearRangeTable (year, object) {
		var firstYear = year;
		var lastYear = year + ( yearRange * yearRange - 1 );
		var table = document.createElement('table');
		table.classList.add('year_range_table');
		table.setAttribute('id', object.idYearRangeTable);

		while (firstYear <= lastYear) {
			var tr = document.createElement('tr');

			for (var i = 0; i < yearRange/numberStringOfYear; i++) {
				var td = document.createElement('td');
				td.innerHTML = firstYear + '-<br>' + ( firstYear + (yearRange-1) );
				var temp = td.innerHTML.split('-');
				if (curYear >= temp[0] && curYear <= temp[1]){
					td.classList.add('current_year');
				}
				tr.appendChild(td);
				firstYear += yearRange;
				if (firstYear > lastYear) {
					break;
				}
			}
			table.appendChild(tr);
		}
		tableWrapper.appendChild(table);
	}

	function switchMonth (elem, object){
		switch (elem) {

			case object.idNextBtn:
				if (currentYear >= maxYear && currentMonth == 11){
					break;
				}
				if (currentMonth == 11) {
					currentMonth = 0;
					currentYear += 1;
				} else {
					currentMonth += 1;
				}
				lastDate = (new Date(currentYear, currentMonth+1, 0)).getDate();
				a.textContent = months[currentMonth] + ' ' + currentYear;
				var table = document.getElementById(object.idDateTable);
				tableWrapper.removeChild(table);
				createDateTable(settings);
				break;

			case object.idPrevBtn:
				if (currentYear <= minYear && currentMonth == 0){
					break;
				}
				if (currentMonth == 0) {
					currentMonth = 11;
					currentYear -= 1;
				} else {
					currentMonth -= 1;
				}
				lastDate = (new Date(currentYear, currentMonth+1, 0)).getDate();
				a.textContent = months[currentMonth] + ' ' + currentYear;
				var table = document.getElementById(object.idDateTable);
				tableWrapper.removeChild(table);
				createDateTable(settings);
				break;
		}
	}

	function switchYear (elem, object) {
		switch (elem) {

			case object.idNextBtn:
				if (currentYear >= maxYear) {
					break;
				}
				currentYear += 1;
				a.textContent = currentYear;
				var monthTable = document.getElementById(object.idMonthTable);
				tableWrapper.removeChild(monthTable);
				createMonthTable(settings);
				break;

			case object.idPrevBtn:
				if (currentYear <= minYear) {
					break;
				}
				currentYear -= 1;
				a.textContent = currentYear;
				var monthTable = document.getElementById(object.idMonthTable);
				tableWrapper.removeChild(monthTable);
				createMonthTable(settings);
				break;
		}
	}

	function switchRangeYear (elem, object) {
		switch (elem) {

		case object.idNextBtn:
			var yearTable = document.getElementById(object.idYearTable);
			var firstYear = +yearTable.lastElementChild.lastElementChild.textContent + 1;
			var lastYear = firstYear + (yearRange - 1);
			if (lastYear > maxYear) {
				break;
			}
			a.textContent = firstYear + ' - ' + lastYear;
			tableWrapper.removeChild(yearTable);
			createYearTable(firstYear, settings);
			break;

		case object.idPrevBtn:
			var yearTable = document.getElementById(object.idYearTable);
			var lastYear = +yearTable.firstElementChild.firstElementChild.textContent - 1;
			var firstYear = lastYear - (yearRange-1);
			if (firstYear < minYear) {
				break;
			}
			a.textContent = firstYear + ' - ' + lastYear;
			tableWrapper.removeChild(yearTable);
			createYearTable(firstYear, settings);
			break;
		}
	}

	function switchRangeRangeYear (elem, object) {
		switch (elem) {

		case object.idNextBtn:
			var yearRangeTable = document.getElementById(object.idYearRangeTable);
			var temp = yearRangeTable.lastElementChild.lastElementChild.textContent.split('-');
			var firstYear = +temp[1] + 1;
			var lastYear = firstYear + (yearRange * yearRange - 1);
			if (lastYear >= maxYear) {
				break;
			}
			a.textContent = firstYear + ' - ' + lastYear;
			tableWrapper.removeChild(yearRangeTable);
			createYearRangeTable(firstYear, settings);
			break;

		case object.idPrevBtn:
			var yearRangeTable = document.getElementById(object.idYearRangeTable);
			var temp = yearRangeTable.firstElementChild.firstElementChild.textContent.split('-');
			var lastYear = +temp[0] - 1;
			var firstYear = lastYear - (yearRange * yearRange - 1);
			if (firstYear <= minYear) {
				break;
			}
			a.textContent = firstYear + ' - ' + lastYear;
			tableWrapper.removeChild(yearRangeTable);
			createYearRangeTable(firstYear, settings);
			break;
		}
	}

	function showMonthTable(object) {
		var dateTable = document.getElementById(object.idDateTable);
		a.textContent = currentYear;
		tableWrapper.removeChild(dateTable);
		dayOfWeek.classList.add('hide_elem');
		createMonthTable(settings);
	}

	function showYearTable(year, object) {
		var monthTable = document.getElementById(object.idMonthTable);
		tableWrapper.removeChild(monthTable);
		createYearTable(year, settings);
		var yearTable = document.getElementById(object.idYearTable);
		var firstYear = yearTable.firstElementChild.firstElementChild.textContent;
		var lastYear = yearTable.lastElementChild.lastElementChild.textContent;
		a.textContent = firstYear + ' - ' + lastYear;
	}

	function showYearRangeTable(year, object) {
		var yearTable = document.getElementById(object.idYearTable);
		tableWrapper.removeChild(yearTable);
		createYearRangeTable(year, settings);
		var yearRangeTable = document.getElementById(object.idYearRangeTable);
		var temp1 = yearRangeTable.firstElementChild.firstElementChild.textContent.split('-');
		var temp2 = yearRangeTable.lastElementChild.lastElementChild.textContent.split('-');
		a.textContent = temp1[0] + ' - ' + temp2[1];
		a.classList.add('not_active');
	}

	function setMonth (elem, object) {
		var monthTable = document.getElementById(object.idMonthTable);
		dayOfWeek.classList.remove('hide_elem');
		currentMonth = monthNames[elem.textContent];
		lastDate = (new Date(currentYear, currentMonth+1, 0)).getDate();
		a.textContent = months[currentMonth] + ' ' + currentYear;
		tableWrapper.removeChild(monthTable);
		createDateTable(settings);
	}

	function setYear (elem, object) {
		var yearTable = document.getElementById(object.idYearTable);
		currentYear = +elem.textContent;
		a.textContent = currentYear;
		tableWrapper.removeChild(yearTable);
		createMonthTable(settings);
	}

	function setYearRange(elem, object) {
		var yearRangeTable = document.getElementById(object.idYearRangeTable);
		var temp = elem.textContent.split('-');
		var year = +temp[0];
		a.textContent = temp[0] + ' - ' + temp[1];
		tableWrapper.removeChild(yearRangeTable);
		createYearTable(year, settings);
		a.classList.remove('not_active');
	}

	function getRandomNum (min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function setFontSize() {
		var temp = parseFloat(getComputedStyle(bgImgWrapper).width);

		if (temp >= 400 ) {
			return tableWrapper.style.fontSize = '1.2em';
		}

		if (temp < 400 && temp > 300 ) {
			return tableWrapper.style.fontSize = '0.9em';
		}

		if (temp <= 300 && temp >= 250 ) {
			a.style.fontSize = '0.75em';
			return tableWrapper.style.fontSize = '0.75em';
		}

		tableWrapper.style.fontSize = '0.6em';
		alert('Внимание! Ширина календаря должна быть не меньше 250px.');
	}

	function setBgImgWrapperWidth(object){
		bgImgWrapper.style.width = object.width;
	}

	function setBgImgWrapperMinHeight(el){
		var tableWrapperPadding = parseFloat(getComputedStyle(tableWrapper).paddingTop) + parseFloat(getComputedStyle(tableWrapper).paddingBottom);
		var aHeight = parseFloat(getComputedStyle(a.parentNode).height) + parseFloat(getComputedStyle(a.parentNode).marginBottom);
		var thHeight = parseFloat(getComputedStyle(dayOfWeek.children[0].children[0]).height);
		var trHeight = parseFloat(getComputedStyle(el).height);
		tableWrapper.style.minHeight = tableWrapperPadding + aHeight + thHeight + (trHeight * 6) +  'px';
	}
}