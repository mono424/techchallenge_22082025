import { useLocation } from "@solidjs/router";
import { Sparkles, Wand } from "lucide-solid";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) => path == location.pathname;
  return (
    <div
      class={`${
        active("/") ? "hidden" : "flex"
      } fixed bottom-44 left-0 right-0 justify-center`}
    >
      <nav class=" m-4 border border-[#d6ccc2] rounded-full w-fit">
        <ul class="flex items-center p-3 text-[#577471]">
          <li>
            <a
              class="flex items-center uppercase text-sm font-bold px-7 py-3 text-amber-50 bg-[#e8ac65] hover:bg-[#e89c65] rounded-full gap-3 text-bold"
              href="/"
            >
              <Sparkles />
              Upload New Image
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
