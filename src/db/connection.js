const mongoose = require("mongoose");

const connectMongo = async () => {
  return main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect(process.env.MONGO_URL);
  }
};

module.exports = { connectMongo };
