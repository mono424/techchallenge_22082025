"use server";
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  endpoint: import.meta.env.VITE_S3_ENDPOINT || undefined,
  forcePathStyle: import.meta.env.VITE_S3_FORCE_PATH_STYLE === "true" || false,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});
