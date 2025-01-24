import {NextFunction, Request, Response} from 'express';
import { authCaregiver } from "../services/caregiver.service";
import {authService} from "../services/auth.service";
import {sendResponse} from "../models/base-response.model";
import {generateJsonWebToken} from "../utils/generators.utils";
import {ICustomExpressRequest} from "../bin/server";
import Caregiver from "../models/caregiver.model";
import Logger from "../utils/logger";
import {CustomError} from "../utils/errors";
import {redis} from "../config/redis.config";


//Invite Caregiver
export const inviteCaregiver = async (
  req: ICustomExpressRequest,
  res: Response,
  _next: NextFunction
) => {
  const { name, phoneNumber,accessLevel } = req.body;
  const  _id : string   = req.currentUser? req.currentUser._id : "";
  if (!name || !phoneNumber || accessLevel === undefined) {
    return sendResponse(res, 400, "Name, phone number, and access level are required.", null);
  }
  try {
    // Generate OTP (verification code)
    const { data } = await authService.sendAlphaNumericOtp(phoneNumber);
    // Delegate the caregiver creation to the service
    const serviceRes = await authCaregiver.inviteCaregiver(
      name,
      phoneNumber,
      accessLevel
    );
    const token = generateJsonWebToken(_id);
    res.set('Authorization', `Bearer ${token}`);
    return res.status(201).json({
      status: true,
      message: "Caregiver invited successfully",
      data: serviceRes.data,
    });
  } catch (error) {
    console.error("Error inviting caregiver:", error);
    return sendResponse(res, 500, "Error occurred while inviting the caregiver.", null);
  }
};






























// export const verifyCaregiver = async (req: ICustomExpressRequest,
//                                res: Response,
//                                _next: NextFunction) => {
//   const { otpPhone } = req.body;
//   const { sessionToken } = req.headers;
//
//   if (!otpPhone || !sessionToken) {
//     return sendResponse(res, 400, "OTP and session token are required.", null);
//   }
//
//   const sessionTokenStr = Array.isArray(sessionToken) ? sessionToken[0] : sessionToken;
//
//   try {
//     // Get the caregiverId from the sessionToken
//     const caregiverId = await redis.get(sessionTokenStr);
//     if (!caregiverId) {
//       return sendResponse(res, 400, "Invalid session token or session expired.", null);
//     }
//     // Find the caregiver using the caregiverId
//     const caregiver = await fetchCaregiver(caregiverId);
//     if (!caregiver) {
//       return sendResponse(res, 404, "Caregiver not found.", null);
//     }
//     // If caregiver is already verified, no need to verify again
//     if (caregiver.isVerified) {
//       return sendResponse(res, 400, "Caregiver is already verified.", null);
//     }
//     // Verify OTP logic
//     const otpStored = await redis.get(sessionTokenStr);
//     if (otpStored !== otpPhone) {
//       return sendResponse(res, 400, "Invalid OTP.", null);
//     }
//     // Mark caregiver as verified
//     caregiver.isVerified = true;
//     await caregiver.save();
//     return res.status(200).json({
//       status: true,
//       message: "Caregiver verified successfully.",
//       data: {
//         _id: caregiver._id,
//         phoneNumber: caregiver.phoneNumber,
//         accessLevel: caregiver.accessLevel,
//         isVerified: caregiver.isVerified,
//       }
//     });
//   } catch (error) {
//     console.error("Error verifying caregiver:", error);
//     return sendResponse(res, 500, "Error occurred while verifying the caregiver.", null);
//   }
// };
//
