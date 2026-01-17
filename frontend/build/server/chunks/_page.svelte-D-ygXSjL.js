import { l as attr_class, m as stringify, j as bind_props } from './index2-AAFviL_P.js';
import { f as ssr_context, e as escape_html } from './context-Clakkcvn.js';
import { g as goto } from './client-BNC96tJQ.js';
import { P as get, O as writable } from './index-D9WViemj.js';
import { s as sessionStats, a as sessionConfig, b as sessionStartTime } from './session-L0w1DfHW.js';
import '@google/genai';
import { g as getPersonaDisplayName, a as getScenarioDisplayName } from './scenarios-BcYR53kb.js';
import './exports-BXvEiaiv.js';
import './state.svelte-D3Qsdoil.js';
import './utils2-_XEu1VD7.js';

function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const transcript = writable([]);
const currentFeedback = writable(null);
function clearFeedback() {
  currentFeedback.set(null);
}
function SessionControls($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { micActive = true, isConnected = false, onEndSession } = $$props;
    $$renderer2.push(`<div class="z-20 flex items-center justify-center gap-6 border-t border-white/10 bg-black/80 p-6 backdrop-blur-md"><button type="button"${attr_class(`rounded-full p-4 transition-all ${stringify(micActive ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-red-500/20 text-red-400")}`)}>`);
    if (micActive) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"></line><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"></path><path d="M5 10v2a7 7 0 0 0 12 5"></path><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"></path><path d="M9 9v3a3 3 0 0 0 5.12 2.12"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <div class="mx-2 h-12 w-[1px] bg-white/10"></div> <div class="max-w-[150px] text-center text-xs text-slate-400">`);
    if (isConnected) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`AI is analyzing your tone and facial cues in real-time.`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`Connecting to AI...`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mx-2 h-12 w-[1px] bg-white/10"></div> <button type="button" class="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-100 backdrop-blur-sm transition-all hover:bg-red-500/40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="22" x2="2" y1="2" y2="22"></line></svg> <span class="text-sm font-semibold">End Call</span></button></div>`);
    bind_props($$props, { micActive });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isConnected = false;
    let micActive = true;
    const config = get(sessionConfig);
    if (!config) {
      goto();
    }
    const personaName = config ? getPersonaDisplayName(config.persona) : "";
    const scenarioName = config ? getScenarioDisplayName(config.scenario) : "";
    function generateMockStats() {
      const currentTranscript = get(transcript);
      const startTime = get(sessionStartTime) || Date.now();
      const duration = Math.floor((Date.now() - startTime) / 1e3);
      const strengthsPool = [
        "You maintained a warm and inviting tone throughout the conversation.",
        "Your pacing was excellent - not too fast, not too slow.",
        "You asked thoughtful follow-up questions that showed genuine interest.",
        "Your body language appeared open and engaged.",
        "You handled pauses naturally without rushing to fill silence.",
        "Your responses were well-structured and easy to follow."
      ];
      const improvementsPool = [
        "Try maintaining eye contact for slightly longer periods.",
        "Consider taking a breath before responding to complex questions.",
        "Practice active listening cues like nodding or brief verbal affirmations.",
        "Work on varying your vocal tone to add more expressiveness.",
        "Try to relax your shoulders during intense moments."
      ];
      const shuffledStrengths = [...strengthsPool].sort(() => Math.random() - 0.5);
      const shuffledImprovements = [...improvementsPool].sort(() => Math.random() - 0.5);
      return {
        duration,
        strengths: shuffledStrengths.slice(0, 3),
        improvements: shuffledImprovements.slice(0, 2),
        transcript: currentTranscript
      };
    }
    function handleEndSession() {
      const stats = generateMockStats();
      sessionStats.set(stats);
      goto();
    }
    function cleanup() {
      clearFeedback();
    }
    onDestroy(() => {
      cleanup();
    });
    let feedback = null;
    const unsubscribeFeedback = currentFeedback.subscribe((value) => {
      feedback = value;
    });
    onDestroy(() => {
      unsubscribeFeedback();
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (config) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative flex h-screen flex-col overflow-hidden bg-slate-900 text-white"><div class="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4"><div class="flex items-center gap-2"><span${attr_class(`h-2 w-2 rounded-full ${stringify("bg-slate-500")}`)}></span> <span class="text-sm font-medium uppercase tracking-wide opacity-80">Live Session • ${escape_html(scenarioName)}</span></div> <button type="button" class="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-100 backdrop-blur-sm transition-all hover:bg-red-500/40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="22" x2="2" y1="2" y2="22"></line></svg> <span class="text-sm font-semibold">End Call</span></button></div> <div class="relative flex flex-1 items-center justify-center"><video class="absolute inset-0 z-0 h-full w-full object-cover opacity-50" muted playsinline></video> <div class="relative z-10 flex flex-col items-center justify-center p-8 text-center"><div${attr_class(`mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-500 ${stringify("scale-90 bg-slate-800")}`)}>`);
        {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
        }
        $$renderer3.push(`<!--]--></div> <h2 class="mb-2 text-2xl font-light tracking-tight">${escape_html(personaName)} `);
        if (config.persona === "discord_kitten") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span>😼</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></h2> <p class="max-w-xs text-sm text-indigo-200/60">${escape_html("Connecting...")}</p></div> `);
        if (feedback) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(`animate-fade-in absolute bottom-32 left-1/2 z-30 -translate-x-1/2 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-500 ${stringify(feedback.severity === "info" ? "border border-blue-400/30 bg-blue-500/20 text-blue-100" : "")} ${stringify(feedback.severity === "warning" ? "border border-amber-400/30 bg-amber-500/20 text-amber-100" : "")} ${stringify(feedback.severity === "success" ? "border border-emerald-400/30 bg-emerald-500/20 text-emerald-100" : "")}`)}><div class="flex items-center gap-3">`);
          if (feedback.type === "eye_contact") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
          } else {
            $$renderer3.push("<!--[!-->");
            if (feedback.type === "posture") {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]--> <span class="text-sm font-medium">${escape_html(feedback.message)}</span></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> `);
        SessionControls($$renderer3, {
          isConnected,
          onEndSession: handleEndSession,
          get micActive() {
            return micActive;
          },
          set micActive($$value) {
            micActive = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
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

export { _page as default };
//# sourceMappingURL=_page.svelte-D-ygXSjL.js.map
