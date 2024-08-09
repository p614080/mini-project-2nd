function generateCalendar() {
  var calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) return; // 요소가 없으면 종료

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var calendarHTML = `<h2>${year}년 ${month + 1}월</h2>`;

  calendarHTML += '<table>';
  calendarHTML += '<tr>';
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  for (let day of daysOfWeek) {
      calendarHTML += `<th>${day}</th>`;
  }
  calendarHTML += '</tr>';

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  let dayCounter = 1;
  for (let i = 0; i < 6; i++) {
      calendarHTML += '<tr>';
      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
              calendarHTML += '<td></td>';
          } else if (dayCounter > totalDaysInMonth) {
              calendarHTML += '<td></td>';
          } else {
              calendarHTML += `<td>${dayCounter}</td>`;
              dayCounter++;
          }
      }
      calendarHTML += '</tr>';
      if (dayCounter > totalDaysInMonth) {
          break;
      }
  }
  calendarHTML += '</table>';
  calendarContainer.innerHTML = calendarHTML;
}

window.onload = generateCalendar;
