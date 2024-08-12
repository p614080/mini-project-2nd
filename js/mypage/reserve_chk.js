document.addEventListener('DOMContentLoaded', function() {
    fetch('/json/mypage/reserve_chk.json')
        .then(response => response.json())
        .then(data => {
            window.originalReservations = data; // 원본 데이터 유지함.
            window.reservations = data;
            window.currentPage = 1;
            window.itemsPerPage = 10;
            displayReservations(data, window.currentPage);
            setupPagination(data.length, window.itemsPerPage);
        });
});

function displayReservations(reservations, page) {
    const tableBody = document.getElementById('reservation-table-body');
    tableBody.innerHTML = '';
    const start = (page - 1) * window.itemsPerPage;
    const end = start + window.itemsPerPage;
    const paginatedReservations = reservations.slice(start, end);
    paginatedReservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${reservation.예약일}</td>
            <td>${reservation.예매번호}</td>
            <td>${reservation.예매자}</td>
            <td>${reservation.행사명}</td>
            <td>${reservation.행사시작일}~${reservation.행사종료일}</td>
            <td>${reservation.매수}</td>
            <td>${reservation.상태}</td>
            <td>${reservation.문의}</td>
        `;
        tableBody.appendChild(row);
    });
}
// <td>${reservation.주최}</td>
// <td>${reservation.장소}</td>
// <td>${reservation.주소}</td>

function setupPagination(totalItems, itemsPerPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i<= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.innerText = i;
        pageLink.className = i === window.currentPage ? 'active' : '';
        pageLink.onclick = () => changePage(i);
        pagination.appendChild(pageLink);
    }
}

function changePage(page) {
    if(page < 1 || page > Math.ceil(window.reservations.length / window.itemsPerPage))
        return;
    window.currentPage = page;
    displayReservations(window.reservations, page);
    setupPagination(window.reservations.length, window.itemsPerPage);
}

function filterReservations(days) {
    if (days === 1000) {
        // 전체 클릭
        window.reservations = window.originalReservations; // 원본 데이터로 복원
    } else {
        // 특정 기간 필터링
        window.reservations = window.originalReservations.filter(reservation => {
            const reservationDate = new Date(reservation.예약일);
            const currentDate = new Date();
            const dateDifference = (currentDate - reservationDate) / (1000 * 3600 * 24);
            return dateDifference <= days;
        });
    }

    window.currentPage = 1;  //페이지를 처음으로 초기화
    displayReservations(window.reservations, window.currentPage);
    setupPagination(window.reservations.length,  window.itemsPerPage);
}