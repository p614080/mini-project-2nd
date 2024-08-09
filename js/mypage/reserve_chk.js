document.addEventListener('DOMContentLoaded', function() {
    fetch('reserve_chk.json')
        .then(response => response.json())
        .then(data => {
            window.reservations = data;
            displayReservations(data);
        });
});

function displayReservations(reservations) {
    const tableBody = document.getElementById('reservation-table-body');
    tableBody.innerHTML = '';
    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${reservation.예약일}</td>
            <td>${reservation.예매번호}</td>
            <td>${reservation.예매자}</td>
            <td>${reservation.행사명}</td>
            <td>${reservation.행사기간}</td>
            <td>${reservation.매수}</td>
            <td>${reservation.상태}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterReservations(days) {
    const filteredReservations = window.reservations.filter(reservation => {
        const reservationDate = new Date(reservation.예약일);
        const currentDate = new Date();
        const dateDifference = (currentDate - reservationDate) / (1000 * 3600 * 24);
        return dateDifference <= days;
    });
    displayReservations(filteredReservations);
}