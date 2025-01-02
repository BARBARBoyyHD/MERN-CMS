const moment = require("moment"); // Ensure you have moment.js installed
const supabase = require("../../config/db");
exports.create = async (req, res) => {
  try {
    const {
      namaKarya,
      status,
      noRegistrasi,
      noSKinstansi,
      usiaKarya,
      objekTerkait,
      unsurPemajuan,
      lokasi,
    } = req.body;
    console.log("Request body:", req.body); // Log request body to debug

    const created_at = moment().format("LL");

    // Convert arrays (from checkboxes) to comma-separated strings
    const objekTerkaitString = Array.isArray(objekTerkait)
      ? objekTerkait.join(", ")
      : "";
    const unsurPemajuanString = Array.isArray(unsurPemajuan)
      ? unsurPemajuan.join(", ")
      : "";

    const objekTerkaitArray = objekTerkaitString
      .split(", ")
      .map((item) => item.trim());
    const unsurPemajuanArray = unsurPemajuanString
      .split(", ")
      .map((item) => item.trim());

    // Insert data into the "content" table
    const { data: contentData, error: contentError } = await supabase
      .from("content")
      .insert([
        {
          namaKarya,
          status,
          noRegistrasi,
          noSKinstansi,
          usiaKarya,
          objekTerkait: objekTerkaitArray, // Save as a single string
          unsurPemajuan: unsurPemajuanArray, // Save as a single string
          lokasi,
          created_at,
        },
      ])
      .select();

    if (contentError) {
      console.error("Insert error:", contentError); // Log error
      return res.status(500).json({ message: contentError.message });
    }

    return res
      .status(200)
      .json({ message: "Content created successfully", data: contentData });
  } catch (error) {
    console.error("Server error:", error); // Log unexpected errors
    return res.status(500).json({ message: error.message });
  }
};
