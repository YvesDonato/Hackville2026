import { x as attr, y as slot, z as bind_props, F as ensure_array_like } from "../../chunks/index2.js";
import { j as fallback } from "../../chunks/utils2.js";
import { e as escape_html } from "../../chunks/escaping.js";
function AppShell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = $$props["title"];
    let subtitle = fallback($$props["subtitle"], null);
    let primaryCta = fallback($$props["primaryCta"], null);
    let secondaryCta = fallback($$props["secondaryCta"], null);
    $$renderer2.push(`<div class="min-h-screen bg-slate-50"><div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10"><header class="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-sm"><div class="flex flex-col gap-3"><p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">NeuRizz</p> <h1 class="text-3xl font-semibold text-slate-900">${escape_html(title)}</h1> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="max-w-2xl text-base text-slate-600">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex flex-wrap items-center gap-3">`);
    if (primaryCta) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", primaryCta.href)} class="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">${escape_html(primaryCta.label)}</a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (secondaryCta) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", secondaryCta.href)} class="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">${escape_html(secondaryCta.label)}</a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { title, subtitle, primaryCta, secondaryCta });
  });
}
function SectionCard($$renderer, $$props) {
  let eyebrow = fallback($$props["eyebrow"], null);
  let title = $$props["title"];
  let description = fallback($$props["description"], null);
  $$renderer.push(`<section class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">`);
  if (eyebrow) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">${escape_html(eyebrow)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <h2 class="text-xl font-semibold text-slate-900">${escape_html(title)}</h2> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-sm text-slate-600">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></section>`);
  bind_props($$props, { eyebrow, title, description });
}
function _page($$renderer) {
  const featureHighlights = [
    {
      title: "Mentorship Engine",
      description: "AI-led practice sessions that simulate real conversations with tailored partner profiles."
    },
    {
      title: "Cognitive Load Balancer",
      description: "Soft visual guardrails and pacing reminders so users stay grounded and in control."
    },
    {
      title: "Shame-Free Rewind",
      description: "Post-session analytics with gentle language, progress trends, and reflection prompts."
    }
  ];
  const missionPoints = [
    {
      title: "Problem",
      description: "High-stakes social moments can trigger executive dysfunction and overwhelm for neurodivergent users."
    },
    {
      title: "Mission",
      description: "Turn social interaction into a practiced, low-pressure skill with real-time coaching."
    }
  ];
  AppShell($$renderer, {
    title: "everyone deserves a fine shyt",
    subtitle: "NeuRizz is a mentorship and date-prep platform that supports neurodivergent and autistic users with real-time feedback, AI coaching, and gentle guidance.",
    primaryCta: { label: "Enter the Lab", href: "/lab" },
    secondaryCta: { label: "See a Demo Session", href: "/session" },
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">`);
      SectionCard($$renderer2, {
        eyebrow: "Mission",
        title: "A calm, practiced approach to social confidence",
        description: "We reduce social latency by blending biometric cues with language coaching in a sensory-safe way.",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="grid gap-4 sm:grid-cols-2"><!--[-->`);
          const each_array = ensure_array_like(missionPoints);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let point = each_array[$$index];
            $$renderer3.push(`<div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"><p class="text-sm font-semibold text-slate-800">${escape_html(point.title)}</p> <p class="mt-2 text-sm text-slate-600">${escape_html(point.description)}</p></div>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      SectionCard($$renderer2, {
        eyebrow: "Live Signals",
        title: "Real-time cues without the pressure",
        description: "Soft banners, posture metrics, and tone coaching update as the session flows.",
        children: ($$renderer3) => {
          $$renderer3.push(`<ul class="space-y-3 text-sm text-slate-600"><li class="rounded-2xl border border-slate-100 bg-white px-4 py-3"><span class="font-semibold text-slate-800">Visual Guardrails:</span> pastel banners prompt eye contact and
					posture adjustments.</li> <li class="rounded-2xl border border-slate-100 bg-white px-4 py-3"><span class="font-semibold text-slate-800">Biometric Scoring:</span> posture, facial expression, and gaze
					tracking with MediaPipe or Gemini Vision.</li> <li class="rounded-2xl border border-slate-100 bg-white px-4 py-3"><span class="font-semibold text-slate-800">Linguistic Analysis:</span> pacing and tone rewrites keep
					conversation balanced.</li></ul>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> `);
      SectionCard($$renderer2, {
        eyebrow: "Core Features",
        title: "Mentorship engine highlights",
        description: "Pick a partner profile, choose a scenario, and rehearse with real-time coaching.",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="grid gap-4 md:grid-cols-3"><!--[-->`);
          const each_array_1 = ensure_array_like(featureHighlights);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let feature = each_array_1[$$index_1];
            $$renderer3.push(`<div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"><p class="text-sm font-semibold text-slate-800">${escape_html(feature.title)}</p> <p class="mt-2 text-sm text-slate-600">${escape_html(feature.description)}</p></div>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      SectionCard($$renderer2, {
        eyebrow: "Architecture",
        title: "Built for accessibility and low latency",
        description: "SvelteKit + Tailwind on the frontend, Gemini Live for audio coaching, and MongoDB Atlas for session history.",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="grid gap-4 md:grid-cols-2"><div class="rounded-2xl border border-slate-100 bg-white px-4 py-4"><p class="text-sm font-semibold text-slate-800">Frontend</p> <p class="mt-2 text-sm text-slate-600">SvelteKit, Tailwind CSS, and accessible UI patterns.</p></div> <div class="rounded-2xl border border-slate-100 bg-white px-4 py-4"><p class="text-sm font-semibold text-slate-800">AI &amp; Storage</p> <p class="mt-2 text-sm text-slate-600">Gemini Live API, Google AI Studio prompt prototyping, MongoDB Atlas storage.</p></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
