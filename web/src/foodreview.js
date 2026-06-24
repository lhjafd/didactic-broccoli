let fetchedFoods = [];

// 백엔드에서 태그 이름을 가져오는 함수
async function getTagName(tagId) {
    try {
        const response = await fetch(`/api/v1/dummy/tags?tagId=${tagId}`);
        const result = await response.json();
        return result.success ? result.data.name : "기타";
    } catch {
        return "알 수 없음";
    }
}

// 전체 음식 데이터 가져오기
async function fetchFoodData() {
    try {
        const response = await fetch("/api/v1/dummy/foods");
        const result = await response.json();

        if (result.success) {
            fetchedFoods = result.data.foods;
            // 로드 완료 후 기본 카테고리(일반 과자) 보여주기
            showCategory('000000000000000000000000000000'); 
        }
    } catch (error) {
        console.error("데이터 로드 실패:", error);
    }
}

// 카테고리별 필터링 출력
async function showCategory(tagId) {
    const list = document.getElementById("foodList");
    const detail = document.getElementById("foodDetail");
    list.innerHTML = "로딩 중...";
    detail.innerHTML = "";

    const tagName = await getTagName(tagId);
    list.innerHTML = `<h3>${tagName}</h3>`;

    const filteredFoods = fetchedFoods.filter(food => food.tags.includes(tagId));

    filteredFoods.forEach(food => {
        // 평점 5점 만점 기준 별점 생성
        const stars = "★".repeat(food.avgRating) + "☆".repeat(5 - food.avgRating);
        
        list.innerHTML += `
        <div class="food-item" onclick="showFood('${food.id}')">
            <h3>${food.name}</h3>
            <p class="mini-star">${stars}</p>
            <p>${food.price.toLocaleString()}원</p>
        </div>
        `;
    });
}

// 상세 정보 출력
function showFood(foodId) {
    const food = fetchedFoods.find(f => f.id === foodId);
    if (!food) return;

    const stars = "★".repeat(food.avgRating) + "☆".repeat(5 - food.avgRating);

    document.getElementById("foodDetail").innerHTML = `
    <div class="detail">
        <div class="food-icon">🍪</div>
        <h2>${food.name}</h2>
        <p><b>가격</b> : ${food.price.toLocaleString()}원</p>
        <p><b>평점</b> : <span class="star">${stars} (${food.avgRating}점)</span></p>
        <p><b>설명</b></p>
        <p>${food.description}</p>
    </div>
    `;
}

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
    fetchFoodData();
});