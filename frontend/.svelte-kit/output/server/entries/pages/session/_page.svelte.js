import "clsx";
import { b as ssr_context } from "../../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { w as writable } from "../../../chunks/index.js";
import "@google/genai";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const currentFeedback = writable(null);
function clearFeedback() {
  currentFeedback.set(null);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function cleanup() {
      clearFeedback();
    }
    onDestroy(() => {
      cleanup();
    });
    const unsubscribeFeedback = currentFeedback.subscribe((value) => {
    });
    onDestroy(() => {
      unsubscribeFeedback();
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex min-h-screen items-center justify-center bg-slate-900"><div class="text-center text-white"><p class="text-slate-400">Initializing session...</p></div></div>`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
