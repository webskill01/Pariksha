import asyncHandler from "../middleware/asyncHandler.js";
import { Paper } from "../models/Paper.js";

export const getMyDashboard =  asyncHandler(async(req,res)=>{
    const {status} = req.query;
    const filter= {uploadedBy : req.userId}
    if(status)filter.status = status;
    const myPapers = await Paper.find(filter).populate('uploadedBy', 'name class semester rollNumber').sort({createdAt:-1});

    const total = myPapers.length;
    const pending = myPapers.filter(p=> p.status ==="pending").length
    const approved = myPapers.filter(p=> p.status ==="approved").length
    const rejected = myPapers.filter(p=> p.status ==="rejected").length
    const totalDownloads = myPapers.reduce((sum , p)=>sum + p.downloadCount , 0);

    res.json({success : true,
        data:{
            stats:{total,pending,approved,rejected,totalDownloads},
            papers : myPapers
        }
    })
});


export const  deleteMyPaper = asyncHandler(async(req,res)=>{
    const paper = await Paper.findById(req.params.id);

    if(!paper || paper.uploadedBy,toString()!== req.user.id){
        return res.status(404).json({success : false , message :"Paper Not Found"})
    };

    if(paper.status === "approved"){
        return res.status(403).json({
            success:false,
            message:"Approved Papers Cannot Be Deleted By students"
        })};

        await Paper.findByIdAndDelete(req.params.id);
        res.json({success:true,message:"Paper Deleted Successfully"});
});

