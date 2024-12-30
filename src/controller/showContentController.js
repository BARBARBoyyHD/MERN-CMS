const supabase = require("../../config/db");

exports.show = async(req,res)=>{
    try {
        
        const {data:showContent,error:showContentError} = await supabase
        .from("content")
        .select("*")

        res.status(200).json({
            message:"Showing all Content",
            data:showContent
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}