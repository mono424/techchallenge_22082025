import { action, query, redirect } from "@solidjs/router";
import { v4 as uuidv4 } from "uuid";

export const addImage = action(async (formData: FormData) => {
  "use server";

  const { s3Client } = await import("~/s3");
  const { PutObjectCommand } = await import("@aws-sdk/client-s3");
  const { processImage } = await import("~/lib/processing");

  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
  const id = uuidv4();
  const key = `uploads/${id}.png`;

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    const processedImage = await processImage(file);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: processedImage,
      ContentType: "image/png",
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(
      `Upload failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  // Redirect after successful upload (outside try-catch)
  throw redirect(`/${id}`);
}, "addImage");
