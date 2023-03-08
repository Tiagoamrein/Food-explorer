const express = require ("express")
const database = require("./database/sqlite")


const app = express()
database()



const PORT = 3333

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}.`);
});
