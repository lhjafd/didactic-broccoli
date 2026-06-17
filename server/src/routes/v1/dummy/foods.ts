import { Router, Request, Response } from "express";

const foods = Router();

// temp
function createFoodData(id: string, name: string, price: number, avgRating: number, description: string, tags: string[]) {
    return {
        id, name, price, avgRating, description, tags
    }
}

foods.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            foods: [
                createFoodData("000000000000000", "포카칩 어니언맛", 1700, 5, "엄청 맛있고 중독성 있다", ["000000000000000000000000000000"]), 
                createFoodData("000000000000001", "스윙칩", 1800, 4, "양념 시즈닝이 인상 깊은 과자", ["000000000000000000000000000000"]),
                createFoodData("000000000000002", "오사쯔", 1300, 4, "달달하고 맛있는 고구마 과자", ["000000000000000000000000000000"]), 
                createFoodData("000000000000003", "홈런볼", 1600, 4, "달콤하고 부드러운 과자", ["000000000000000000000000000000"]), 

                createFoodData("000000000000004", "갈비만두", 2000, 5, "육즙이 가득한 맛있는 만두", ["000000000000000000000000000001"]),

                createFoodData("000000000000005", "피크닉", 1000, 4, "무난무난하고 맛있다", ["000000000000000000000000000002"])
            ]
        }
    });
});

export default foods;