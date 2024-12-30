const supabase = require("../../config/db")

exports.delete = async(req,res)=>{
    try {
        
        const {id} = req.params

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const {data:deleteContent,error:deleteContentError} = await supabase
        .from("content")
        .delete()
        .eq("id",id)

        if (deleteContentError) {
            return res.status(500).json({ message: deleteContentError.message });
        }

        res.status(200).json({message:"Content deleted successfully"})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}