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
    const { data: updateContent, error: updateContentError } = await supabase
      .from("content")
      .update({
        namaKarya: namaKarya,
        status: status,
        noRegistrasi: noRegistrasi,
        noSKinstansi: noSKinstansi,
        usiaKarya: usiaKarya,
        objekTerkait: objekTerkait,
        unsurPemajuan: unsurPemajuan,
        lokasi: lokasi,
      })
      .eq("id", id)
      .select();

    if (updateContentError) {
      return res.status(500).json({ message: updateContentError.message });
    }

    res
      .status(200)
      .json({ message: "Content updated successfully", data: updateContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
