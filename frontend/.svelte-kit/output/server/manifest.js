export const manifest = (() => {
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
		client: {start:"_app/immutable/entry/start.CU43egwG.js",app:"_app/immutable/entry/app.Kct48Grr.js",imports:["_app/immutable/entry/start.CU43egwG.js","_app/immutable/chunks/cLnldb3O.js","_app/immutable/chunks/Dxni6C9n.js","_app/immutable/chunks/CmM5mwaB.js","_app/immutable/entry/app.Kct48Grr.js","_app/immutable/chunks/Dxni6C9n.js","_app/immutable/chunks/ChfMM_rv.js","_app/immutable/chunks/CMwt7tYF.js","_app/immutable/chunks/CmM5mwaB.js","_app/immutable/chunks/aGeVYNOu.js","_app/immutable/chunks/D40zmhlZ.js","_app/immutable/chunks/CTkgetDu.js","_app/immutable/chunks/DS_W-6P9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
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
