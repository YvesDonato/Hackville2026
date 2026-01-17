import { e as escape_html, g as getContext } from './context-Clakkcvn.js';
import './state.svelte-D3Qsdoil.js';
import { s as stores } from './client-BNC96tJQ.js';
import './utils2-_XEu1VD7.js';
import './exports-BXvEiaiv.js';
import './index-D9WViemj.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-C85zMfwV.js.map
