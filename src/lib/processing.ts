"use server";
import { isServer } from "solid-js/web";

export const processImage = async (image: File) => {
  if (!isServer) {
    throw new Error("Image processing must be done on the server side");
  }

  const { removeBackground } = await import("@imgly/background-removal-node");
  const backgroundRemovedBlob = await removeBackground(image);

  const arrayBuffer = await backgroundRemovedBlob.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  const sharp = (await import("sharp")).default;
  const processedImage = await sharp(inputBuffer).flop().png().toBuffer();

  return processedImage;
};
