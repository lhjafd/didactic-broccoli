// ==========================================
// 1. 기존 UI 제어 및 유효성 로직 (유지)
// ==========================================
const koreanNumbers = ["첫", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열"];

function toggleForm() {
    const modal = document.getElementById("comboModal");
    if (!modal) return;
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

function closeModal(event) {
    const modal = document.getElementById("comboModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// 음식 입력창 동적 추가 함수
function addFoodField() {
    const container = document.getElementById("foodInputList");
    const currentCount = container.getElementsByClassName("food-input-item").length;
    
    if (currentCount >= 10) {
        alert("음식은 최대 10개까지만 추가할 수 있습니다.");
        return;
    }

    const nextNumText = koreanNumbers[currentCount] || (currentCount + 1);

    const newInputGroup = document.createElement("div");
    newInputGroup.className = "input-group food-input-item";
    newInputGroup.innerHTML = `
        <label>${nextNumText} 번째 음식</label>
        <div class="input-row">
            <input type="text" placeholder="음식 이름을 입력하세요">
            <button type="button" class="remove-food-btn" onclick="removeFoodField(this)">×</button>
        </div>
    `;

    container.appendChild(newInputGroup);
}

// 음식 입력창 삭제 함수
function removeFoodField(button) {
    const itemToRemove = button.closest(".food-input-item");
    if (itemToRemove) itemToRemove.remove();
    updateLabels();
}

// 라벨 순서 재정렬 함수
function updateLabels() {
    const container = document.getElementById("foodInputList");
    const items = container.getElementsByClassName("food-input-item");

    for (let i = 0; i < items.length; i++) {
        const label = items[i].querySelector("label");
        const numText = koreanNumbers[i] || (i + 1);
        if (label) label.textContent = `${numText} 번째 음식`;
    }
}

// 글자 수 실시간 업데이트 함수
function updateCharCount() {
    const textarea = document.getElementById("comboDescription");
    const charCountDisplay = document.getElementById("charCount");
    if (!textarea || !charCountDisplay) return;
    
    const currentLength = textarea.value.length;
    charCountDisplay.textContent = `${currentLength} / 200`;

    if (currentLength >= 200) {
        charCountDisplay.style.color = "#ff5c5c";
    } else {
        charCountDisplay.style.color = "#999";
    }
}


// ==========================================
// 2. 백엔드 연동 대비 데이터 핸들링 로직 (최적화)
// ==========================================

// [더미 데이터] 백엔드 DB의 combinations 테이블 구조 시뮬레이션
let dummyCombinations = [
    {
        id: "combo_001",
        creator: "user_hong",
        name: "🍪 포카칩 + 🥤 피크닉",
        description: "단짠 조합의 정석",
        foods: ["food_snack_01", "food_drink_01"] // 실제 DB 연동을 고려해 음식 ID 형태로 매핑될 자리
    },
    {
        id: "combo_002",
        creator: "user_kim",
        name: "🍟 스윙칩 + 🥤 콜라",
        description: "무난한 국룰 조합",
        foods: ["food_snack_02", "food_drink_02"]
    }
];

// 백엔드 서버에서 조합 데이터를 받아오는 비동기 함수
async function fetchCombinations() {
    try {
        // 💡 나중에 백엔드에서 조합 더미 API(/api/v1/dummy/combinations)를 만들어 주면 아래 주석을 해제하세요!
        // const response = await fetch('/api/v1/dummy/combinations');
        // const result = await response.json();
        // if (result.success) { dummyCombinations = result.data.combinations; }

        // 현재는 준비된 더미 배열로 화면 렌더링
        renderCombinations(dummyCombinations);
    } catch (error) {
        console.error("조합 데이터를 가져오는 중 오류 발생:", error);
    }
}

// 데이터를 받아 화면에 카드를 동적으로 그려주는 함수
function renderCombinations(combinations) {
    const container = document.getElementById("comboContainer");
    if (!container) return;
    
    container.innerHTML = ""; // 기존 카드 초기화

    combinations.forEach(combo => {
        const card = document.createElement("div");
        card.className = "combo-card";
        
        // 나중에 특정 조합 클릭 시 리뷰 목록 조회를 위한 식별자 바인딩
        card.setAttribute("data-id", combo.id); 
        
        // 카드를 클릭하면 고유 ID를 쿼리스트링에 들고 리뷰 페이지로 이동
        card.onclick = function() {
            window.location.href = `foodreview.html?combinationId=${combo.id}`;
        };

        card.innerHTML = `
            <h2>${combo.name}</h2>
            <p>${combo.description}</p>
        `;
        
        container.appendChild(card);
    });
}

// 모달에서 '조합 등록하기'를 눌렀을 때 실행될 함수
function handleComboSubmit() {
    const inputElements = document.querySelectorAll("#foodInputList input");
    const foodList = [];
    
    inputElements.forEach(input => {
        if (input.value.trim() !== "") {
            foodList.push(input.value.trim());
        }
    });

    const description = document.getElementById("comboDescription").value.trim();

    // 유효성 검사
    if (foodList.length < 2) {
        alert("최소 2개 이상의 음식을 입력해주세요.");
        return;
    }
    if (!description) {
        alert("조합 설명을 입력해주세요.");
        return;
    }

    // 💡 백엔드 DB 스키마(combinations) 규격에 맞춘 전송용 데이터 객체 생성
    const newCombo = {
        id: "combo_" + Date.now(), // 실서비스에선 백엔드 DB가 자동 생성할 고유 UUID 역할
        creator: "current_user",   // 로그인 세션 등에서 처리될 유저 정보
        name: foodList.join(" + "), // 화면 노출용 조합 타이틀 생성 (예: 포카칩 + 피크닉)
        description: description,
        foods: foodList             // combination_foods 테이블로 들어갈 데이터 목록
    };

    // 💡 나중에 백엔드 등록 API가 나오면 아래 주석을 풀고 fetch POST 요청을 보내면 됩니다!
    /*
    fetch('/api/v1/dummy/combinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCombo)
    });
    */

    // 지금은 서버가 없으므로 로컬 배열 맨 앞에 추가(unshift)하여 실시간 반영 시뮬레이션
    dummyCombinations.unshift(newCombo); 
    renderCombinations(dummyCombinations);

    // 입력 폼 초기화 및 모달 닫기
    resetForm();
    toggleForm();
}

// 등록 완료 후 폼을 초기 상태로 깨끗하게 비우는 함수
function resetForm() {
    const descriptionArea = document.getElementById("comboDescription");
    if (descriptionArea) descriptionArea.value = "";
    
    const inputList = document.getElementById("foodInputList");
    if (inputList) {
        inputList.innerHTML = `
            <div class="input-group food-input-item">
                <label>첫 번째 음식</label>
                <div class="input-row">
                    <input type="text" placeholder="예) 포카칩">
                </div>
            </div>
            <div class="input-group food-input-item">
                <label>두 번째 음식</label>
                <div class="input-row">
                    <input type="text" placeholder="예) 피크닉">
                    <button type="button" class="remove-food-btn" onclick="removeFoodField(this)">×</button>
                </div>
            </div>
        `;
    }
    updateCharCount();
}

// ==========================================
// 3. 앱 초기화 및 이벤트 바인딩
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 최초 화면 로드 시 조합 데이터 받아오기 실행
    fetchCombinations();
    
    // HTML의 '조합 등록하기' 버튼에 클릭 이벤트 명시적 매핑
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
        submitBtn.onclick = handleComboSubmit;
    }
});