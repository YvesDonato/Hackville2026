import { e as escape_html } from './context-Clakkcvn.js';
import { P as get } from './index-D9WViemj.js';
import { g as goto } from './client-BNC96tJQ.js';
import { s as sessionStats } from './session-L0w1DfHW.js';
import { k as ensure_array_like, l as attr_class, m as stringify } from './index2-AAFviL_P.js';
import './utils2-_XEu1VD7.js';
import './exports-BXvEiaiv.js';
import './state.svelte-D3Qsdoil.js';

function StrengthsList($$renderer, $$props) {
  let { strengths } = $$props;
  $$renderer.push(`<div class="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="rounded-2xl bg-emerald-50 p-3 text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg></div> <h3 class="text-xl font-bold text-slate-800">Glowing</h3></div> <ul class="space-y-4"><!--[-->`);
  const each_array = ensure_array_like(strengths);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let strength = each_array[$$index];
    $$renderer.push(`<li class="flex items-start gap-4 leading-relaxed text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-emerald-500"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg> <span>${escape_html(strength)}</span></li>`);
  }
  $$renderer.push(`<!--]--></ul></div>`);
}
function ImprovementsList($$renderer, $$props) {
  let { improvements } = $$props;
  $$renderer.push(`<div class="rounded-3xl border border-amber-100 bg-white p-8 shadow-sm"><div class="mb-6 flex items-center gap-3"><div class="rounded-2xl bg-amber-50 p-3 text-amber-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path><path d="M12 16V8"></path></svg></div> <h3 class="text-xl font-bold text-slate-800">Growing</h3></div> <ul class="space-y-4"><!--[-->`);
  const each_array = ensure_array_like(improvements);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let improvement = each_array[$$index];
    $$renderer.push(`<li class="flex items-start gap-4 leading-relaxed text-slate-600"><div class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400"></div> <span>${escape_html(improvement)}</span></li>`);
  }
  $$renderer.push(`<!--]--></ul></div>`);
}
function TranscriptBubble($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { entry } = $$props;
    $$renderer2.push(`<div${attr_class(`flex gap-4 ${stringify(entry.speaker === "user" ? "flex-row-reverse" : "")}`)}><div${attr_class(`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${stringify(entry.speaker === "user" ? "bg-indigo-100 text-indigo-600" : "bg-rose-100 text-rose-600")}`)}>${escape_html(entry.speaker === "user" ? "ME" : "AI")}</div> <div${attr_class(`max-w-[85%] rounded-3xl px-5 py-3 text-base leading-relaxed shadow-sm ${stringify(entry.speaker === "user" ? "rounded-tr-none bg-indigo-600 text-white" : "rounded-tl-none bg-slate-100 text-slate-800")}`)}>${escape_html(entry.text)}</div></div>`);
  });
}
function TranscriptViewer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { entries } = $$props;
    $$renderer2.push(`<div class="max-h-[500px] space-y-6 overflow-y-auto p-6 md:p-8">`);
    if (
      // Auto-scroll to bottom when new entries come in
      entries.length > 0
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(entries);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let entry = each_array[i];
        TranscriptBubble($$renderer2, { entry });
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="py-12 text-center"><p class="italic text-slate-400">No conversation recorded yet.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const stats = get(sessionStats);
    if (!stats) {
      goto();
    }
    function formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
    if (stats) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="min-h-screen overflow-y-auto bg-pastel-slate p-6 md:p-12"><div class="animate-slide-in mx-auto max-w-4xl space-y-8"><div class="mb-10 space-y-2 text-center"><h1 class="text-4xl font-extrabold tracking-tight text-slate-800">The Rewind</h1> <p class="text-lg text-slate-500">Here is a breakdown of your social vibe.</p> <p class="text-sm text-slate-400">Session duration: ${escape_html(formatDuration(stats.duration))}</p></div> <div class="grid grid-cols-1 gap-6 md:grid-cols-2">`);
      StrengthsList($$renderer2, { strengths: stats.strengths });
      $$renderer2.push(`<!----> `);
      ImprovementsList($$renderer2, { improvements: stats.improvements });
      $$renderer2.push(`<!----></div> <div class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"><div class="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-6"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> <h3 class="font-semibold text-slate-700">Full Transcript</h3></div> `);
      TranscriptViewer($$renderer2, { entries: stats.transcript });
      $$renderer2.push(`<!----></div> <div class="flex flex-col justify-center gap-4 pb-12 pt-4 md:flex-row"><button type="button" class="flex transform items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-black hover:shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg> <span>Practice Again</span></button> <button type="button" class="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition-all hover:bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> <span>Save Report</span></button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DGczaJSO.js.map
