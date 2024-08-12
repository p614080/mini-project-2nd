document.getElementById('confirm-btn').addEventListener('click', function() {
    //세션 스토리지에서 사용자 정보 가져오기
    const userJson = sessionStorage.getItem('randomUser');

    const user = JSON.parse(userJson);

    //  입력된 새 비밀번호
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    //  비밀번호 유효성 검사
    if (newPassword !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }

    // 비밀번호가 일치하는 경우
    if (user.password === newPassword){
        alert('새 비밀번호로 변경하였습니다.');
        window.location.href = '/mypage/mypage.html';
    } else {
        alert("기존 비밀번호가 일치하지 않습니다.")
    }

});