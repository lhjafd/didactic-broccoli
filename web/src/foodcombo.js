const koreanNumbers = ["첫", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열"];

function toggleForm() {
    const modal = document.getElementById("comboModal");
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
    // 버튼이 속한 .food-input-item 요소를 찾아서 삭제
    const itemToRemove = button.closest(".food-input-item");
    itemToRemove.remove();

    // 중간 번호가 삭제되어도 순서가 안 깨지도록 라벨 재정렬
    updateLabels();
}

// 라벨 순서(첫 번째, 두 번째...)를 다시 정렬하는 함수
function updateLabels() {
    const container = document.getElementById("foodInputList");
    const items = container.getElementsByClassName("food-input-item");

    for (let i = 0; i < items.length; i++) {
        const label = items[i].querySelector("label");
        const numText = koreanNumbers[i] || (i + 1);
        label.textContent = `${numText} 번째 음식`;
    }
}

// 글자 수 실시간 업데이트 함수 (최대 200자)
function updateCharCount() {
    const textarea = document.getElementById("comboDescription");
    const charCountDisplay = document.getElementById("charCount");
    
    const currentLength = textarea.value.length;
    charCountDisplay.textContent = `${currentLength} / 200`;

    if (currentLength >= 200) {
        charCountDisplay.style.color = "#ff5c5c";
    } else {
        charCountDisplay.style.color = "#999";
    }
}