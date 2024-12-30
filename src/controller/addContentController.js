const supabase = require("../../config/db");
const moment = require("moment");


exports.create = async (req, res) => {
    try {
        const {namaKarya,status,noRegistrasi,noSKinstansi,usiaKarya,objekTerkait,unsurPemajuan,lokasi} = req.body
        const created_at = moment().format("LL"); 

        const {data:contentData,error:contentError} = await supabase
        .from("content")
        .insert([
            {
                namaKarya:namaKarya,
                status:status,
                noRegistrasi:noRegistrasi,
                noSKinstansi:noSKinstansi,
                usiaKarya:usiaKarya,
                objekTerkait:objekTerkait,
                unsurPemajuan:unsurPemajuan,
                lokasi:lokasi,
                created_at:created_at
            }
        ])
        .select()

        if(contentError){
            return res.status(500).json({ message: contentError.message });
        }
        return res.status(200).json({message:"Content created successfully",data:contentData})


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}