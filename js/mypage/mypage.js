function redirectToPasswordAuth(action) {
    fetch('/json/mypage/user_info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // JSON 데이터에서 랜덤으로 사용자 선택
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomUser = data[randomIndex];

            console.log('Selected User:', randomUser);

            // 세션 스토리지에 저장
            sessionStorage.setItem('randomUser', JSON.stringify(randomUser));

            // 쿠키에 저장
            document.cookie = `randomUser=${encodeURIComponent(JSON.stringify(randomUser))}; path=/; max-age=${60 * 60 * 24}`;

            // password_auth.html로 리다이렉트하면서 action 정보를 전달
            window.location.href = `/mypage/password_auth.html?action=${action}`;
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// 홈으로 이동
document.querySelector('.btnHeader1').addEventListener('click', function() {
    window.location.href = `/main/home.html`;
});

// 회원정보변경 버튼 클릭 시
document.querySelector('.btnHeader2').addEventListener('click', function() {
    redirectToPasswordAuth('update');
});

// 비밀번호변경 버튼 클릭 시
document.querySelector('.btnHeader3').addEventListener('click', function() {
    redirectToPasswordAuth('passwordChange');
});

// 회원탈퇴 버튼 클릭 시
document.querySelector('.btnHeader4').addEventListener('click', function() {
    if (confirm("정말로 회원 탈퇴를 하시겠습니까? 비밀번호 인증 페이지로 이동합니다.")) {
        redirectToPasswordAuth('delete');
    }
});