import express, {Request, Response, NextFunction} from "express";
import v1 from "./routes/index";
import { configDotenv } from "dotenv";

configDotenv()

const app = express();
const port = 3000;

app.use(express.json({
  strict: true,   // 배열/객체만 허용 (기본값 true)
  limit: '1mb',   // 페이로드 크기 제한 초과 시도 413 에러
}));

app.get('/api/test', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use("/api", v1);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});