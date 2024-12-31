const supabase = require("../../config/db");
const moment = require("moment");

exports.create = async (req, res) => {
    try {
        const { namaKarya, status, noRegistrasi, noSKinstansi, usiaKarya, objekTerkait, unsurPemajuan, lokasi } = req.body;
        const created_at = moment().format("LL");

        // Ensure objekTerkait and unsurPemajuan are arrays
        const objekTerkaitArray = Array.isArray(objekTerkait) ? objekTerkait : [objekTerkait];
        const unsurPemajuanArray = Array.isArray(unsurPemajuan) ? unsurPemajuan : [unsurPemajuan];

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
                    objekTerkait: objekTerkaitArray,
                    unsurPemajuan: unsurPemajuanArray,
                    lokasi,
                    created_at
                }
            ])
            .select();

        if (contentError) {
            return res.status(500).json({ message: contentError.message });
        }
        return res.status(200).json({ message: "Content created successfully", data: contentData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
