
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
		RouteId(): "/" | "/api" | "/api/scores" | "/api/transcriptions" | "/api/wingman" | "/lab" | "/rewind" | "/session" | "/textMentor";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/scores": Record<string, never>;
			"/api/transcriptions": Record<string, never>;
			"/api/wingman": Record<string, never>;
			"/lab": Record<string, never>;
			"/rewind": Record<string, never>;
			"/session": Record<string, never>;
			"/textMentor": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/scores" | "/api/scores/" | "/api/transcriptions" | "/api/transcriptions/" | "/api/wingman" | "/api/wingman/" | "/lab" | "/lab/" | "/rewind" | "/rewind/" | "/session" | "/session/" | "/textMentor" | "/textMentor/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/BlueHeart.png" | "/SarahTheSquare.png" | "/discordKitten.png" | "/robots.txt" | string & {};
	}
}