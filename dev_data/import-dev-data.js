const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const Users = require("../models/userSchema"); // Adjust path as needed

// Load environment variables
dotenv.config({ path: "./config.env" });

// Database connection
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

// Read user data
const users = JSON.parse(fs.readFileSync(`${__dirname}/sample.json`, "utf-8"));

// Function to hash passwords before import
const hashUserPasswords = async (users) => {
  return Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return user;
    })
  );
};

// Import data function
const importData = async () => {
  try {
    const hashedUsers = await hashUserPasswords(users);
    await Users.create(hashedUsers, { validateBeforeSave: false });
    console.log(`${users.length} users successfully loaded!`);
  } catch (err) {
    console.error("Error importing data:", err);
  }
  process.exit();
};

// Delete data function
const deleteData = async () => {
  try {
    await Users.deleteMany();
    console.log("User data successfully deleted!");
  } catch (err) {
    console.error("Error deleting data:", err);
  }
  process.exit();
};

// Handle command line arguments
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  console.log("Please specify --import or --delete");
  process.exit();
}
