import { Router, Request, Response } from "express";

const tags = Router();

tags.get("/", (req: Request, res: Response) => {
    const tag = req.query.tagId;

    if (req.query.tagId === undefined || tag?.length != 30) {
        return res.status(400).json({
            success: false,
            message: 'tag parameter is required. ' 
        });
    }

    if (tag == "000000000000000000000000000000") {
        res.status(200).json({
            success: true,
            data: {
                name: "일반 과자"
            }
        });
    } else if (tag == "000000000000000000000000000001") {
        res.status(200).json({
            success: true,
            data: {
                name: "냉동 음식"
            }
        });
    } else if (tag == "000000000000000000000000000002") {
        res.status(200).json({
            success: true,
            data: {
                name: "음료수"
            }
        });
    } else {
        res.status(404).json({
            success: false,
            message: `tagId(${tag}) does not exist. `
        });
    }
});

export default tags;