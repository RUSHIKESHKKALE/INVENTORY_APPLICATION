
import multer from "multer";

const storageConFig=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images/");
    },
    filename:(req,file,cb)=>{
        const filename=Date.now()+"-"+file.originalname
        cb(null,filename);
    }
})

export const uploadFile = multer({
    storage:storageConFig,
})