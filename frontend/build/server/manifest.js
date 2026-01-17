const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BUswkaKn.js",app:"_app/immutable/entry/app.BlYEakCj.js",imports:["_app/immutable/entry/start.BUswkaKn.js","_app/immutable/chunks/DQtkclW5.js","_app/immutable/chunks/Dxni6C9n.js","_app/immutable/chunks/CmM5mwaB.js","_app/immutable/entry/app.BlYEakCj.js","_app/immutable/chunks/Dxni6C9n.js","_app/immutable/chunks/ChfMM_rv.js","_app/immutable/chunks/CMwt7tYF.js","_app/immutable/chunks/CmM5mwaB.js","_app/immutable/chunks/aGeVYNOu.js","_app/immutable/chunks/D40zmhlZ.js","_app/immutable/chunks/CTkgetDu.js","_app/immutable/chunks/DS_W-6P9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./chunks/0-XjTtw0Eu.js')),
			__memo(() => import('./chunks/1-BYN6aRet.js')),
			__memo(() => import('./chunks/2-DXcQTufB.js')),
			__memo(() => import('./chunks/3-CvlG5JIX.js')),
			__memo(() => import('./chunks/4-DHTr-WwF.js')),
			__memo(() => import('./chunks/5-Dmvfgr14.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/lab",
				pattern: /^\/lab\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/rewind",
				pattern: /^\/rewind\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/session",
				pattern: /^\/session\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
