const supabase = require("../../config/db");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Retrieve the user based on the username
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    // Compare the hashed password with the password provided
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If passwords match, return a success message
    return res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
