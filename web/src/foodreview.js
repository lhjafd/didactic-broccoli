
const foodData = {

    snack: [

        {
            name: "포카칩 어니언맛",
            price: "1700원",
            rating: 5,
            review: "엄청 맛있고 중독성 있다"
        },

        {
            name: "스윙칩",
            price: "1800원",
            rating: 4,
            review: "양념 시즈닝이 인상 깊은 과자"
        },

        {
            name: "오사쯔",
            price: "1300원",
            rating: 4,
            review: "달달하고 맛있는 고구마 과자"
        },

        {
            name: "홈런볼",
            price: "1600원",
            rating: 4,
            review: "달콤하고 부드러운 과자"
        }

    ],

    frozen: [

        {
            name: "갈비만두",
            price: "2000원",
            rating: 5,
            review: "육즙이 가득한 맛있는 만두"
        }

    ],

    drink: [

        {
            name: "피크닉",
            price: "1000원",
            rating: 4,
            review: "무난무난하고 맛있다"
        }

    ]

};

function showCategory(category){

    const list = document.getElementById("foodList");
    const detail = document.getElementById("foodDetail");

    list.innerHTML = "";
    detail.innerHTML = "";

    foodData[category].forEach(food => {

        list.innerHTML += `
        <div class="food-item" onclick="showFood('${category}','${food.name}')">

            <h3>${food.name}</h3>

            <p class="mini-star">
                ${"★".repeat(food.rating)}
            </p>

            <p>${food.price}</p>

        </div>
        `;

    });

}

function showFood(category, foodName){

    const food = foodData[category].find(f => f.name === foodName);

    const stars = "★".repeat(food.rating) + "☆".repeat(5 - food.rating);

    document.getElementById("foodDetail").innerHTML = `

    <div class="detail">
        <div class="food-icon">🍪</div>
        <h2>${food.name}</h2>

        <p><b>가격</b> : ${food.price}</p>

        <p><b>평점</b> : <span class="star">${stars}</span></p>

        <p><b>평가</b></p>

        <p>${food.review}</p>

    </div>

    `;

}
showCategory("snack");