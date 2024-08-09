// // JSON 파일을 fetch로 가져오기
// fetch('user_info.json')
//     .then(response => response.json())
//     .then(data => {
//         // JSON 데이터에서 30개 항목 중 하나를 랜덤으로 선택
//         const randomIndex = Math.floor(Math.random() * 30);
//         const randomUser = data[randomIndex];

//         // 선택한 데이터를 세션 스토리지에 저장
//         sessionStorage.setItem('randomUser', JSON.stringify(randomUser));

//         // 선택한 데이터를 쿠키에 저장 (예시: 유효기간 1일)
//         document.cookie = `randomUser=${encodeURIComponent(JSON.stringify(randomUser))}; path=/; max-age=${60 * 60 * 24}`;

//         console.log('Selected User:', randomUser);
//     })
//     .catch(error => console.error('Error fetching JSON data:', error));



// // 세션 스토리지 또는 쿠키에서 데이터 가져오기
// const storedUser = sessionStorage.getItem('randomUser') 
// ? JSON.parse(sessionStorage.getItem('randomUser')) 
// : JSON.parse(decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('randomUser=')).split('=')[1]));

// // 폼 필드에 데이터 채우기
// if (storedUser) {
//     document.getElementById('email').value = storedUser.email;
//     document.getElementById('name').value = storedUser.name;
//     document.getElementById('phone1').value = storedUser.phone.split('-')[0];
//     document.getElementById('phone2').value = storedUser.phone.split('-')[1];
//     document.getElementById('phone3').value = storedUser.phone.split('-')[2];
//     document.getElementById('consent1').checked = storedUser.consent1;
//     document.getElementById('consent2').checked = storedUser.consent2;
// }

// // 수정 버튼 클릭 시 동작
// function updateInfo() {
//     // 폼 필드에서 수정된 값 가져오기
//     const updatedUser = {
//         email: document.getElementById('email').value,
//         name: document.getElementById('name').value,
//         phone: document.getElementById('phone1').value + '-' + document.getElementById('phone2').value + '-' + document.getElementById('phone3').value,
//         consent1: document.getElementById('consent1').checked,
//         consent2: document.getElementById('consent2').checked
//     };

//     // 세션 스토리지 또는 쿠키에 업데이트된 데이터 저장
//     sessionStorage.setItem('randomUser', JSON.stringify(updatedUser));
//     document.cookie = `randomUser=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/; max-age=${60 * 60 * 24}`;

//     alert("회원정보가 수정되었습니다.");

//     // alert 창 확인 후 mypage.html로 리다이렉트
//     window.location.href = './mypage.html';
// }

// function phoneAuth() {
//     alert("휴대폰 본인인증은 미구현 상태입니다.")
// }

// 세션 스토리지 또는 쿠키에서 데이터 가져오기
const storedUser = sessionStorage.getItem('randomUser') 
    ? JSON.parse(sessionStorage.getItem('randomUser')) 
    : JSON.parse(decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('randomUser=')).split('=')[1]));

// 폼 필드에 데이터 채우기
if (storedUser) {
    document.getElementById('email').value = storedUser.email;
    document.getElementById('name').value = storedUser.name;
    const phoneParts = storedUser.phone.split('-');
    document.getElementById('phone1').value = phoneParts[0];
    document.getElementById('phone2').value = phoneParts[1];
    document.getElementById('phone3').value = phoneParts[2];
    document.getElementById('consent1').checked = storedUser.consent1;
    document.getElementById('consent2').checked = storedUser.consent2;
}

// 수정 버튼 클릭 시 동작
function updateInfo() {
    // 폼 필드에서 수정된 값 가져오기
    const updatedUser = {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone1').value + '-' + document.getElementById('phone2').value + '-' + document.getElementById('phone3').value,
        consent1: document.getElementById('consent1').checked,
        consent2: document.getElementById('consent2').checked
    };

    // 세션 스토리지 또는 쿠키에 업데이트된 데이터 저장
    sessionStorage.setItem('randomUser', JSON.stringify(updatedUser));
    document.cookie = `randomUser=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/; max-age=${60 * 60 * 24}`;

    alert("회원정보가 수정되었습니다.");
    window.location.href = './mypage.html';
}

function phoneAuth() {
    alert("휴대폰 본인인증은 현재 구현되지 않았습니다.");
}
