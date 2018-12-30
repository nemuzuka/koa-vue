import * as app from "./App";

const port = process.env.PORT || 3000;
app.listen(port);
console.info(`Listening to http://localhost:${port}`);
