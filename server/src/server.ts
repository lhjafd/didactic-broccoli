import express, {Request, Response} from "express";
import v1 from "./routes/index";

const app = express();
const port = 3000;

app.get('/api/test', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use("/api", v1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});