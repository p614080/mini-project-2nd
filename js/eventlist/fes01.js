// 별점 기능
$('.star_rating > .star').click(function() {
  $(this).parent().children('span').removeClass('on');
  $(this).addClass('on').prevAll('span').addClass('on');
})

// 리뷰 등록 버튼 동작 메서드
$(".btn01").on("click", function(e){
  
});

//팝업창
// scripts.js

// 팝업 창 열기 함수
function openPopup() {
  const popup = window.open("", "popupWindow", "width=600,height=400,scrollbars=yes");
  popup.document.write(`
      <html>
      <head>
      <link rel="stylesheet" href="/codetest/styles.css">
          <title>팝업 창</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 20px;
              }
              .popup-content {
                  text-align: center;
                  padding: 20px;
              }
              .calendar {
                  margin-top: 20px;
                  padding: 10px;
                  font-size: 1.2em;
                  border: 1px solid #ccc;
              }
          </style>
      </head>
      <body>
         <div id="popupModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span> <!--닫기창-->
            <h2>Calendar</h2>
            <div id="calendar"></div>
        </div>
    </div>
     <script src="/codetest/scripts.js"></script>
      </body>
      </html>
  `);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("popup_btn").addEventListener("click", openPopup);
});


