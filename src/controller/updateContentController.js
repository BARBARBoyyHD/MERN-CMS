const supabase = require("../../config/db");

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
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

    // Serialize arrays into JSON strings
    const serializedObjekTerkait = JSON.stringify(objekTerkait);
    const serializedUnsurPemajuan = JSON.stringify(unsurPemajuan);

    const { data: updateContent, error: updateContentError } = await supabase
      .from("content")
      .update({
        namaKarya,
        status,
        noRegistrasi,
        noSKinstansi,
        usiaKarya,
        objekTerkait: serializedObjekTerkait, // Store as JSON string
        unsurPemajuan: serializedUnsurPemajuan, // Store as JSON string
        lokasi,
      })
      .eq("id", id)
      .select();

    if (updateContentError) {
      return res.status(500).json({ message: updateContentError.message });
    }

    // Deserialize JSON strings back into arrays in the response
    const deserializedContent = {
      ...updateContent[0],
      objekTerkait: JSON.parse(updateContent[0].objekTerkait),
      unsurPemajuan: JSON.parse(updateContent[0].unsurPemajuan),
    };

    res
      .status(200)
      .json({
        message: "Content updated successfully",
        data: deserializedContent,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
