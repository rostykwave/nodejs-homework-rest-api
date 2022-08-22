const mongoose = require("mongoose");

const connectMongo = async () => {
  return main().catch((err) => {
    console.log(`Failed to launch application with error: ${err}`);
    process.exit(1);
  });

  async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful");
  }
};

module.exports = { connectMongo };
