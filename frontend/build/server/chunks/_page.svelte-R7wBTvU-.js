import { O as attr, T as ensure_array_like, V as attr_class, X as stringify, Q as bind_props } from './index2-C8YbHsXl.js';
import './exports-BXvEiaiv.js';
import './state.svelte-DkotzKg1.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-CXhJZien.js';
import './utils2-Bl_acQ9N.js';

const personas = [
  {
    id: "male",
    name: "Alex",
    description: "Friendly, casual",
    color: "bg-pastel-blue text-blue-600"
  },
  {
    id: "female",
    name: "Sarah",
    description: "Warm, engaging",
    color: "bg-pastel-rose text-rose-600"
  },
  {
    id: "discord_kitten",
    name: "Kitten",
    description: "Chaotic, slang-heavy",
    color: "bg-purple-100 text-purple-600"
  }
];
function PersonaSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { selected = null } = $$props;
    $$renderer2.push(`<div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(personas);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let persona = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`w-full rounded-xl border-2 p-4 text-left transition-all ${stringify(selected === persona.id ? "border-indigo-500 bg-indigo-50" : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50")}`)}><div class="flex items-center gap-4"><div${attr_class(`flex h-12 w-12 items-center justify-center rounded-full ${stringify(persona.color)}`)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg></div> <div class="flex-1"><div class="font-semibold text-slate-800">${escape_html(persona.name)}</div> <div class="text-xs text-slate-500">${escape_html(persona.description)}</div></div> `);
      if (selected === persona.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-indigo-600">●</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></button>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selected });
  });
}
const scenarios = [
  {
    id: "coffee_shop",
    name: "Coffee Shop",
    description: "Casual low-pressure intro with gentle ambient noise.",
    icon: "coffee"
  },
  {
    id: "restaurant",
    name: "Dinner Date",
    description: "Seated conversation with pacing and table etiquette cues.",
    icon: "utensils"
  },
  {
    id: "video_call",
    name: "Video Call",
    description: "Camera framing, eye contact, and virtual presence coaching.",
    icon: "video"
  }
];
function ScenarioSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { selected = null } = $$props;
    $$renderer2.push(`<div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(scenarios);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let scenario = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`w-full rounded-xl border-2 p-4 text-left transition-all ${stringify(selected === scenario.id ? "border-emerald-500 bg-emerald-50" : "border-white bg-white hover:border-slate-200")}`)}><div class="flex items-center gap-4"><div${attr_class(`flex items-center justify-center rounded-full p-3 ${stringify(selected === scenario.id ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500")}`)}>`);
      if (scenario.icon === "coffee") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (scenario.icon === "utensils") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <span class="font-medium text-slate-700">${escape_html(scenario.name)}</span> `);
      if (selected === scenario.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="ml-auto text-emerald-600">●</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></button>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selected });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedPersona = null;
    let selectedScenario = null;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div class="animate-slide-in flex min-h-[600px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row"><div class="flex flex-1 flex-col border-b border-slate-100 p-8 md:border-b-0 md:border-r md:p-12"><h2 class="mb-6 text-2xl font-bold text-slate-800">1. Choose Partner</h2> <div class="flex-1">`);
      PersonaSelector($$renderer3, {
        get selected() {
          return selectedPersona;
        },
        set selected($$value) {
          selectedPersona = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div class="flex flex-1 flex-col bg-slate-50/50 p-8 md:p-12"><h2 class="mb-6 text-2xl font-bold text-slate-800">2. Set Scene</h2> <div class="flex-1">`);
      ScenarioSelector($$renderer3, {
        get selected() {
          return selectedScenario;
        },
        set selected($$value) {
          selectedScenario = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="mt-8 border-t border-slate-200 pt-6"><button type="button"${attr("disabled", !selectedPersona || !selectedScenario, true)} class="w-full rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">Start Session</button></div></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-R7wBTvU-.js.map
