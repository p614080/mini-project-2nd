document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirm-btn');
    const passwordInput = document.getElementById('password');

    // 세션 스토리지 또는 쿠키에서 데이터 가져오기
    const storedUser = sessionStorage.getItem('randomUser') 
        ? JSON.parse(sessionStorage.getItem('randomUser')) 
        : JSON.parse(decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('randomUser=')).split('=')[1]));

    if (storedUser) {
        console.log('Stored User:', storedUser);
    }

    if (confirmButton && passwordInput) {
        confirmButton.addEventListener('click', function() {
            const inputPassword = passwordInput.value;
            const action = new URLSearchParams(window.location.search).get('action');

            if (inputPassword === storedUser.password) {
                if (action === 'update') {
                    window.location.href = '/mypage/user_info_modify.html';
                } else if (action === 'passwordChange') {
                    window.location.href = '/mypage/password_change.html';
                } else if (action === 'delete') {
                    alert('회원탈퇴 처리가 완료되었습니다.');
                    window.location.href = '/main/home.html';
                }
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    } else {
        console.error('버튼 또는 입력 요소를 찾을 수 없습니다.');
    }
});
