"use server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { APIEvent } from "@solidjs/start/server";
import { s3Client } from "~/s3";

const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

export async function GET({ params }: APIEvent) {
  const fileId = params.id;

  const key = `uploads/${fileId}.png`;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error("Image not found");
    }

    return new Response(response.Body.transformToWebStream(), {
      headers: {
        "Content-Type": response.ContentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="file-${fileId}"`,
      },
    });
  } catch (error) {
    return new Response("Error fetching file", { status: 500 });
  }
}
