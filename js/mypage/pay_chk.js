document.addEventListener('DOMContentLoaded', function() {
    fetch('/json/mypage/pay_chk.json')
        .then(response => response.json())
        .then(data => {
            window.originalPayList = data; // 원본 데이터 유지함.
            window.payList = data;
            window.currentPage = 1;
            window.itemsPerPage = 10;
            displayPayments(data, window.currentPage);
            setupPagination(data.length, window.itemsPerPage);
        });
});

function displayPayments(payList, page) {
    const tableBody = document.getElementById('pay-table-body');
    tableBody.innerHTML = '';
    const start = (page - 1) * window.itemsPerPage;
    const end = start + window.itemsPerPage;
    const paginationPayList = payList.slice(start, end);
    paginationPayList.forEach((payment, index) => {
        const row = document.createElement('tr');
        const formattedAmount = payment.결제금액.toLocaleString(); // 금액을 쉼표로 구분
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${payment.상품명}</td>
            <td>${payment.결제번호}</td>
            <td>${payment.결제자명}</td>
            <td>${payment.결제일}</td>
            <td>${formattedAmount}</td>
            <td>${payment.결제방법}</td>
            <td>${payment.상태}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupPagination(totalItems, itemsPerPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totaltPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totaltPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.innerText = i;
        pageLink.className = i === window.currentPage ? 'active' : '';
        pageLink.onclick = (e) => {
            e.preventDefault();
            changePage(i);
        };
        pagination.appendChild(pageLink);
    }
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(window.payList.length / window.itemsPerPage)) {
        return;
    }
    window.currentPage = page;
    displayPayments(window.payList, page);
    setupPagination(window.payList.length, window.itemsPerPage);
}

function filterPay(days) {
    if(days === 1000) {
        // 전체 클릭
        window.payList = window.originalPayList;  // 원본 데이터로 복원
    } else {
        // 특정 기간 필터링
        window.payList = window.originalPayList.filter(payment => {
            const paymentDate = new Date(payment.결제일);
            const currentDate = new Date();
            const dateDifference = (currentDate - paymentDate) / (1000 * 3600 * 24);
            return dateDifference <= days;
        });
    }
    window.currentPage = 1;     // 페이지를 처음으로 초기화
    displayPayments(window.payList, window.currentPage);
    setupPagination(window.payList.length, window.itemsPerPage);
}