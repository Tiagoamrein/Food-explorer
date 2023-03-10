const express = require ("express")
const database = require("./database/sqlite")
const routes = require("./routes")

const app = express()
database()
app.use(express.json()) 
app.use(routes)


const PORT = 3333

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}.`);
});
