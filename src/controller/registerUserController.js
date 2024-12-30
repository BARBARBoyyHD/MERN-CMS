require("dotenv").config();
const supabase = require("../../config/db");
const moment = require("moment");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const created_at = moment().format("LL"); // Format the timestamp correctly

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    // Add the user to the `users` table (store the auth_id as UUID)
    const { data: userData, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          email: email,
          password: hashedPassword,
          created_at: created_at, // You can store the created_at timestamp here if needed
        },
      ])
      .select();

    if (insertError) {
      return res
        .status(500)
        .json({ message: "Failed to save user in database", error: insertError.message });
    }

    // Respond with success
    return res.status(201).json({
      message: "User registered successfully",
      data: { user: userData[0] },
    });
  } catch (error) {
    // Catch unexpected errors
    return res.status(500).json({ message: error.message });
  }
};
