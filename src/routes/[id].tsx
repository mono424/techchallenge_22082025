import { A, useParams } from "@solidjs/router";
import { Sparkles } from "lucide-solid";

export default function ImageView() {
  const params = useParams<{ id: string }>();

  return (
    <main class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-4xl font-bold flex items-center gap-4 fixed top-0 left-0 text-white pl-10 pr-24 pt-4 pb-7 rounded-br-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        An magical image <Sparkles color="white" />
      </h1>
      <div class="text-center">
        <img
          src={`/img/${params.id}`}
          alt={`Image ${params.id}`}
          class="w-screen h-screen"
          style="object-fit: cover;"
        />
      </div>
    </main>
  );
}
