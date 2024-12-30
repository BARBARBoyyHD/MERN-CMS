const supabase = require("../../config/db");

exports.single = async(req,res)=>{
    try {
        const {id} = req.params
        const {data:getContent,error:getContentError} = await supabase
        .from("content")
        .select("*")
        .eq("id",id)

        if(!getContent){
            return res.status(404).json({ message: "Content not found" });
        }

        if(getContentError){
            return res.status(500).json({ message: getContentError.message });
        }

        res.status(200).json({message:"Content found successfully",data:getContent})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}