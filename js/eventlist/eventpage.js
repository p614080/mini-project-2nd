function filterPosts(category) {
  const posts = document.querySelectorAll('.post');
  
  posts.forEach(post => {
      if (category === 'all') {
          post.style.display = 'block'; // 모든 포스터 표시
      } else if (post.classList.contains(category)) {
          post.style.display = 'block'; // 선택된 카테고리의 포스터만 표시
      } else {
          post.style.display = 'none'; // 나머지는 숨김
      }
  });
}


// --------- 검색 기능

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        filterPosts('all', query); // 검색 쿼리를 추가하여 필터링 함수 호출
    });
});

// 필터링 함수
function filterPosts(filter, query = '') {
    const items = document.querySelectorAll('#festival li');
    
    items.forEach(item => {
        // 필터링 처리
        const matchesFilter = filter === 'all' || item.classList.contains(filter);
        const matchesQuery = item.textContent.toLowerCase().includes(query);
        
        if (matchesFilter && matchesQuery) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }

        // 애니메이션 효과
        item.classList.remove('show');
    });

    // 화면이 업데이트된 후에 애니메이션을 적용합니다.
    setTimeout(() => {
        items.forEach(item => {
            if (item.style.display === 'block') {
                item.classList.add('show');
            }
        });
    }, 10);
}

