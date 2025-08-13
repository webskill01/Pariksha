// backend/config/r2.js - Enhanced with debugging and error handling

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  },
  forcePathStyle: true,
  signatureVersion: "v4",
});

//  upload function
export const uploadToR2 = async (fileBuffer, fileName, mimeType) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    const result = await r2.send(command);
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("R2 upload error:", error);
    throw new Error("Failed to upload file to cloud storage");
  }
};

//  Delete function with better debugging and error handling
export const deleteFromR2 = async (fileUrl) => {
  try {

    if (!fileUrl) {
      return { success: true, message: "No file to delete" };
    }

    // Better file key extraction logic
    let fileName;
    
    try {
      const url = new URL(fileUrl);
      
      // Method 1: If using R2_PUBLIC_URL prefix
      if (fileUrl.startsWith(process.env.R2_PUBLIC_URL)) {
        fileName = fileUrl.replace(`${process.env.R2_PUBLIC_URL}/`, '');
      } 
      // Method 2: Extract from pathname
      else {
        fileName = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
      }
      
    } catch (urlError) {
      console.error("URL parsing error:", urlError);
      // Fallback: try to extract filename differently
      const parts = fileUrl.split('/');
      fileName = parts[parts.length - 1];
    }

    if (!fileName || fileName === '') {
      throw new Error("Could not extract filename from URL");
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: fileName,
    });

    const result = await r2.send(deleteCommand);
    
    return { 
      success: true, 
      fileName,
      message: "File deleted from R2 storage",
      result
    };

  } catch (error) {
    console.error("=== R2 DELETE ERROR ===");
    console.error("Error details:", error);
    console.error("Error code:", error.Code);
    console.error("Error message:", error.message);
    console.error("========================");
    
    // Don't throw error - return failure info instead
    return {
      success: false,
      error: error.message,
      fileName: fileName || 'unknown',
      message: `Failed to delete file from R2: ${error.message}`
    };
  }
};
