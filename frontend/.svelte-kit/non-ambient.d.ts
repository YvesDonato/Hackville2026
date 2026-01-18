
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/auth" | "/api/auth/google" | "/api/auth/google/callback" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/signup" | "/api/scores" | "/api/transcriptions" | "/api/wingman" | "/dashboard" | "/lab" | "/login" | "/rewind" | "/session" | "/signup" | "/textMentor";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/auth": Record<string, never>;
			"/api/auth/google": Record<string, never>;
			"/api/auth/google/callback": Record<string, never>;
			"/api/auth/login": Record<string, never>;
			"/api/auth/logout": Record<string, never>;
			"/api/auth/signup": Record<string, never>;
			"/api/scores": Record<string, never>;
			"/api/transcriptions": Record<string, never>;
			"/api/wingman": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/lab": Record<string, never>;
			"/login": Record<string, never>;
			"/rewind": Record<string, never>;
			"/session": Record<string, never>;
			"/signup": Record<string, never>;
			"/textMentor": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/auth" | "/api/auth/" | "/api/auth/google" | "/api/auth/google/" | "/api/auth/google/callback" | "/api/auth/google/callback/" | "/api/auth/login" | "/api/auth/login/" | "/api/auth/logout" | "/api/auth/logout/" | "/api/auth/signup" | "/api/auth/signup/" | "/api/scores" | "/api/scores/" | "/api/transcriptions" | "/api/transcriptions/" | "/api/wingman" | "/api/wingman/" | "/dashboard" | "/dashboard/" | "/lab" | "/lab/" | "/login" | "/login/" | "/rewind" | "/rewind/" | "/session" | "/session/" | "/signup" | "/signup/" | "/textMentor" | "/textMentor/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/BlueHeart.png" | "/SarahTheSquare.png" | "/alex.png" | "/discordKitten.png" | "/robots.txt" | string & {};
	}
}