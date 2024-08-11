// 별점 기능
$('.star_rating > .star').click(function() {
  $(this).parent().children('span').removeClass('on');
  $(this).addClass('on').prevAll('span').addClass('on');
})

// 리뷰 등록 버튼 동작 메서드
$(document).ready(function() {
    let selectedRating = 0;

    // 별점 선택 이벤트
    $(".star").on("click", function() {
        selectedRating = $(this).data("value");
        $(".star").removeClass("selected");
        $(this).addClass("selected");
        $(this).prevAll().addClass("selected");
    });

    $(".star_btn").on("click", function(e) {
        e.preventDefault();
        
        // 입력된 리뷰 내용과 선택된 별점 가져옴
        const reviewContent = $(".star_box").val();
        
        // 빈 리뷰 또는 별점 미선택 방지
        if (reviewContent.trim() === "" || selectedRating === 0) {
            alert("별점과 리뷰 내용을 모두 입력해주세요.");
            return;
        }
        
        // 새로운 리뷰 요소 생성
        const newReview = $("<div></div>").addClass("review");
        
        // 별점 표시 부분 생성
        const starRatingDisplay = $("<div></div>").addClass("star_rating_display");
        for (let i = 0; i < selectedRating; i++) {
            starRatingDisplay.append("&#9733;");
        }
        
        // 리뷰 내용 부분 생성
        const reviewText = $("<div></div>").addClass("review_content").text(reviewContent);
        
        // 리뷰에 별점과 내용 추가
        newReview.append(starRatingDisplay).append(reviewText);
        
        // 리뷰 목록에 추가
        $("#reviewList").append(newReview);
        
        // 입력 필드 및 별점 초기화
        $(".star_box").val("");
        $(".star").removeClass("selected");
        selectedRating = 0;
    });
});



// 팝업 창 열기 
function openPopup() {
  const popup = window.open("", "popupWindow", "width=600,height=400,scrollbars=yes");
  popup.document.write(`
      <html>
      <head>
      <title>예약하기</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                input, select {
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                }
                .btn {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 20px;
                    cursor: pointer;
                }
                .close-btn {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 20px;
                    cursor: pointer;
                }
                #confirmation, #complete {
                    display: none;
                }
            </style>
        </head>
        <body>
            <div id="reservation">
                <h3>예약하기</h3>
                
                <div class="form-group">
                    <label for="date">날짜 선택:</label>
                    <input type="date" id="date" name="date">
                </div>
    
                <div class="form-group">
                    <label for="adults">대인:</label>
                    <select id="adults" name="adults">
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                    </select>
                </div>
    
                <div class="form-group">
                    <label for="children">소인:</label>
                    <select id="children" name="children">
                        <option value="0">0명</option>
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                    </select>
                </div>
    
                <button class="btn" onclick="showConfirmation()">확인</button>
                <button class="close-btn" onclick="window.close()">닫기</button>
            </div>

            <div id="confirmation">
                <h3>예약 정보 확인</h3>
                <p id="selectedDate"></p>
                <p id="selectedAdults"></p>
                <p id="selectedChildren"></p>

                <button class="btn" onclick="completeReservation()">확인</button>
                <button class="btn" onclick="goBack()">뒤로 가기</button>
                <button class="close-btn" onclick="window.close()">닫기</button>
            </div>

            <div id="complete">
                <h3>예약이 완료되었습니다!</h3>
                <p>예약해 주셔서 감사합니다.</p>

                <button class="close-btn" onclick="window.close()">닫기</button>
            </div>

            <script>
                function showConfirmation() {
                    // 선택한 값 가져오기
                    const date = document.getElementById('date').value;
                    const adults = document.getElementById('adults').value;
                    const children = document.getElementById('children').value;

                    // 선택한 값 표시
                    document.getElementById('selectedDate').textContent = "선택한 날짜: " + date;
                    document.getElementById('selectedAdults').textContent = "대인: " + adults + "명";
                    document.getElementById('selectedChildren').textContent = "소인: " + children + "명";

                    // 예약 화면 숨기기, 확인 화면 보이기
                    document.getElementById('reservation').style.display = 'none';
                    document.getElementById('confirmation').style.display = 'block';
                }

                function goBack() {
                    // 확인 화면 숨기기, 예약 화면 보이기
                    document.getElementById('confirmation').style.display = 'none';
                    document.getElementById('reservation').style.display = 'block';
                }

                function completeReservation() {
                    // 확인 화면 숨기기, 완료 화면 보이기
                    document.getElementById('confirmation').style.display = 'none';
                    document.getElementById('complete').style.display = 'block';
                }
            </script>
  `);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("popup_btn").addEventListener("click", openPopup);
});


