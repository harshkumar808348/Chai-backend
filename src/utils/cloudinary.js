import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

import { v2 as cloudinary } from 'cloudinary';


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    const uploadOnCloudinary  = async (localFilePath)=>{
        try {
               if(!localFilePath)   return null
                // upload the file on cloudinary
                const response  = await cloudinary.uploader.upload(localFilePath, {
                    resource_type: "auto",
                })

                /// file has benn uplaoded sucessfully 
                console.log("file is uploaded on cloudinary" , response.url);
                return response;
                
        } catch (error) {
            fs.unlinkSync(localFilePath); // remove the locally saved temperoroy as the uplaod operation as failed  
            return null
        }
    }

    export   {uploadOnCloudinary}

