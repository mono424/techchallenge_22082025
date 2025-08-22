import { A } from "@solidjs/router";
import UploadImageBox from "~/components/UploadImageBox";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <UploadImageBox />
    </main>
  );
}
