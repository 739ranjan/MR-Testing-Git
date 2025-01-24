import { ICustomExpressRequest } from "../bin/server";
import {Response} from 'express';
import { sendResponse } from "../models/base-response.model";
import User from "../models/user.model";

const uploadImage = async(
    req: ICustomExpressRequest,
    res: Response
) => {
    const userId = req.currentUser;
    if(!userId){
        return sendResponse(res, 400, "Invalid User", null);
    }

    if (!req.file) {
        return sendResponse(res, 400, "No image provided", null);
    }

    const pictureUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { pictureUrl: pictureUrl } },
        { new: true }
      );
  
      if (!updatedUser) {
        return sendResponse(res, 500, "Picture uploading failed!", null);
      }
  
      return sendResponse(res, 200, "Picture uploaded successfully", {
        pictureUrl,
      });
}

const updateUserProfile = async(
    req: ICustomExpressRequest,
    res: Response
) => {
    const userId = req.currentUser;
    if(!userId){
        return sendResponse(res, 400, "Invalid User", null);
    }

    const updateFields = req.body;
    if (Object.keys(updateFields).length === 0)
        return sendResponse(res, 400, "No fields to update.", null);

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        {new: true}
    );

    if(!updatedUser)
        return sendResponse(res, 500, "User profile updation failed", null);        
    
    return sendResponse(res, 200, "User profile updated successfully", null);

}

export {
    uploadImage,
    updateUserProfile
};