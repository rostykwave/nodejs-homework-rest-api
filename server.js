const { connectMongo } = require("./src/db/connection");
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error at a servers launch: ", err);
      }
      console.log(`Server running. Use our API on port: ${PORT}!`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};

start();
