import { createSignal } from "solid-js";
import { useSubmission } from "@solidjs/router";
import { Wand } from "lucide-solid";
import { addImage } from "~/lib/actions";

export default function UploadImageBox() {
  const [file, setFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  let fileInputRef: HTMLInputElement | undefined;

  const submission = useSubmission(addImage);

  const isValidImage = (file: File) => {
    return file.type === "image/png" || file.type === "image/jpeg";
  };

  const handleFileSelect = (selectedFile: File) => {
    if (isValidImage(selectedFile)) {
      setFile(selectedFile);
      // Set the file to the hidden input
      if (fileInputRef) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.files = dataTransfer.files;
      }
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer?.files;
    if (files?.[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleClick = () => {
    if (file()) return;
    fileInputRef?.click();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <form
      action={addImage}
      method="post"
      enctype="multipart/form-data"
      class={`fixed inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 z-50 ${
        isDragging()
          ? "bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-pink-400/40 animate-pulse"
          : "bg-gray-200"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/png,image/jpeg"
        style="display: none"
        onChange={handleInputChange}
      />
      <div class="pointer-events-none">
        {submission.pending || submission.error ? (
          <div class="flex flex-col items-center gap-4 text-center max-w-md">
            {submission.pending ? (
              <div class="flex flex-col items-center gap-2">
                <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-blue-600 font-medium">Uploading ...</span>
              </div>
            ) : (
              <span
                class={`font-medium ${
                  !submission.error ? "text-green-600" : "text-red-600"
                }`}
              >
                {submission.error?.message ?? "Uploaded successfully"}
              </span>
            )}
          </div>
        ) : file() ? (
          <div class="flex flex-col items-center gap-4 text-green-600 font-medium">
            <span>📁 {file()!.name}</span>
          </div>
        ) : (
          <div
            class={`text-gray-500 text-lg italic transition-all duration-300 ${
              isDragging() ? "scale-200 animate-pulse" : "scale-100"
            }`}
          >
            Click or{" "}
            <span
              class={isDragging() ? "font-bold text-blue-400 uppercase" : ""}
            >
              drag
            </span>{" "}
            an image here
          </div>
        )}
      </div>
      <div class="fixed bottom-44 left-0 right-0 flex justify-center">
        <nav class=" m-4 border border-[#d6ccc2] rounded-full w-fit p-3">
          <button
            type="submit"
            disabled={submission.pending || !file()}
            class={
              "disabled:text-[#6b6b6b] bg-blue-500 cursor-pointer text-blue-100 disabled:bg-[#9c9c9c]/20 rounded-full px-7 py-3 flex items-center gap-3 text-bold hover:opacity-80 transition-all duration-300 disabled:cursor-not-allowed"
            }
          >
            <Wand />
            {submission.pending
              ? "Uploading..."
              : !file()
              ? "Drop your Image anywhere"
              : "Upload and see magic"}
          </button>
        </nav>
      </div>
    </form>
  );
}
