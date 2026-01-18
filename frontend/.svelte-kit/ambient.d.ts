
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHLVL: string;
	export const PROMPT_INDICATOR_VI_INSERT: string;
	export const depsBuildTarget: string;
	export const depsTargetTargetPropagated: string;
	export const DIRENV_DIFF: string;
	export const depsHostHostPropagated: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const GDM_X_SERVER_EXTRA_ARGS: string;
	export const doCheck: string;
	export const preferLocalBuild: string;
	export const TERM: string;
	export const USER: string;
	export const DIRENV_WATCHES: string;
	export const depsBuildTargetPropagated: string;
	export const AR: string;
	export const LD: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const FILE_PWD: string;
	export const XDG_BACKEND: string;
	export const PATH: string;
	export const nativeBuildInputs: string;
	export const stdenv: string;
	export const builder: string;
	export const CMD_DURATION_MS: string;
	export const DIRENV_FILE: string;
	export const PKG_CONFIG_PATH: string;
	export const phases: string;
	export const SOURCE_DATE_EPOCH: string;
	export const HOST_PATH: string;
	export const INFOPATH: string;
	export const __structuredAttrs: string;
	export const TRANSIENT_PROMPT_COMMAND_RIGHT: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const TERM_PROGRAM: string;
	export const NIX_CC: string;
	export const LD_LIBRARY_PATH: string;
	export const configureFlags: string;
	export const dontAddDisableDepTrack: string;
	export const PKG_CONFIG: string;
	export const shell: string;
	export const PROMPT_INDICATOR: string;
	export const NIX_LDFLAGS: string;
	export const SIZE: string;
	export const SHELL: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const COLORTERM: string;
	export const shellHook: string;
	export const LOGNAME: string;
	export const NIX_STORE: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const OBJDUMP: string;
	export const NM: string;
	export const USERNAME: string;
	export const strictDeps: string;
	export const RANLIB: string;
	export const LOCALE_ARCHIVE: string;
	export const GTK_A11Y: string;
	export const QT_PLUGIN_PATH: string;
	export const LAST_EXIT_CODE: string;
	export const NIXOS_OZONE_WL: string;
	export const propagatedNativeBuildInputs: string;
	export const OLDPWD: string;
	export const STRIP: string;
	export const XDG_VTNR: string;
	export const depsTargetTarget: string;
	export const HOME: string;
	export const PROMPT_MULTILINE_INDICATOR: string;
	export const TZDIR: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const _: string;
	export const CUPS_DATADIR: string;
	export const IN_NIX_SHELL: string;
	export const TRANSIENT_PROMPT_MULTILINE_INDICATOR: string;
	export const PROMPT_INDICATOR_VI_NORMAL: string;
	export const GIO_EXTRA_MODULES: string;
	export const OPENCODE: string;
	export const LANG: string;
	export const buildPhase: string;
	export const XCURSOR_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const CC: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const out: string;
	export const HYPRLAND_CMD: string;
	export const NO_AT_BRIDGE: string;
	export const patches: string;
	export const QML2_IMPORT_PATH: string;
	export const CXX: string;
	export const NIX_PATH: string;
	export const XDG_DATA_DIRS: string;
	export const propagatedBuildInputs: string;
	export const depsHostHost: string;
	export const name: string;
	export const WLR_NO_HARDWARE_CURSORS: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const XDG_SESSION_DESKTOP: string;
	export const CONFIG_SHELL: string;
	export const DESKTOP_SESSION: string;
	export const TERM_PROGRAM_VERSION: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const LIBEXEC_PATH: string;
	export const NIX_BINTOOLS: string;
	export const CURRENT_FILE: string;
	export const NIX_LD: string;
	export const outputs: string;
	export const GHOSTTY_BIN_DIR: string;
	export const buildInputs: string;
	export const OBJCOPY: string;
	export const XDG_SESSION_CLASS: string;
	export const PWD: string;
	export const cmakeFlags: string;
	export const AS: string;
	export const mesonFlags: string;
	export const STARSHIP_SESSION_KEY: string;
	export const NODE_PATH: string;
	export const NIX_HARDENING_ENABLE: string;
	export const NIX_BUILD_CORES: string;
	export const NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const RUST_SRC_PATH: string;
	export const doInstallCheck: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const GDM_LANG: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const XDG_CONFIG_DIRS: string;
	export const depsBuildBuildPropagated: string;
	export const TERMINFO_DIRS: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const HYPRCURSOR_THEME: string;
	export const GDMSESSION: string;
	export const QT_STYLE_OVERRIDE: string;
	export const XDG_SESSION_ID: string;
	export const GTK_PATH: string;
	export const HYPRCURSOR_SIZE: string;
	export const AGENT: string;
	export const XDG_SEAT: string;
	export const SSH_AUTH_SOCK: string;
	export const STRINGS: string;
	export const WAYLAND_DISPLAY: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const system: string;
	export const TERMINFO: string;
	export const READELF: string;
	export const NU_VERSION: string;
	export const XDG_SESSION_TYPE: string;
	export const DISPLAY: string;
	export const GI_TYPELIB_PATH: string;
	export const STARSHIP_SHELL: string;
	export const depsBuildBuild: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const DIRENV_DIR: string;
	export const BUN_BE_BUN: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_GEMINI_API_KEY: string;
	export const PUBLIC_ELEVENLABS_API_KEY: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHLVL: string;
		PROMPT_INDICATOR_VI_INSERT: string;
		depsBuildTarget: string;
		depsTargetTargetPropagated: string;
		DIRENV_DIFF: string;
		depsHostHostPropagated: string;
		GDK_PIXBUF_MODULE_FILE: string;
		GDM_X_SERVER_EXTRA_ARGS: string;
		doCheck: string;
		preferLocalBuild: string;
		TERM: string;
		USER: string;
		DIRENV_WATCHES: string;
		depsBuildTargetPropagated: string;
		AR: string;
		LD: string;
		NIX_CFLAGS_COMPILE: string;
		FILE_PWD: string;
		XDG_BACKEND: string;
		PATH: string;
		nativeBuildInputs: string;
		stdenv: string;
		builder: string;
		CMD_DURATION_MS: string;
		DIRENV_FILE: string;
		PKG_CONFIG_PATH: string;
		phases: string;
		SOURCE_DATE_EPOCH: string;
		HOST_PATH: string;
		INFOPATH: string;
		__structuredAttrs: string;
		TRANSIENT_PROMPT_COMMAND_RIGHT: string;
		MOZ_ENABLE_WAYLAND: string;
		TERM_PROGRAM: string;
		NIX_CC: string;
		LD_LIBRARY_PATH: string;
		configureFlags: string;
		dontAddDisableDepTrack: string;
		PKG_CONFIG: string;
		shell: string;
		PROMPT_INDICATOR: string;
		NIX_LDFLAGS: string;
		SIZE: string;
		SHELL: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		COLORTERM: string;
		shellHook: string;
		LOGNAME: string;
		NIX_STORE: string;
		QT_QPA_PLATFORMTHEME: string;
		NIX_ENFORCE_NO_NATIVE: string;
		OBJDUMP: string;
		NM: string;
		USERNAME: string;
		strictDeps: string;
		RANLIB: string;
		LOCALE_ARCHIVE: string;
		GTK_A11Y: string;
		QT_PLUGIN_PATH: string;
		LAST_EXIT_CODE: string;
		NIXOS_OZONE_WL: string;
		propagatedNativeBuildInputs: string;
		OLDPWD: string;
		STRIP: string;
		XDG_VTNR: string;
		depsTargetTarget: string;
		HOME: string;
		PROMPT_MULTILINE_INDICATOR: string;
		TZDIR: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		_: string;
		CUPS_DATADIR: string;
		IN_NIX_SHELL: string;
		TRANSIENT_PROMPT_MULTILINE_INDICATOR: string;
		PROMPT_INDICATOR_VI_NORMAL: string;
		GIO_EXTRA_MODULES: string;
		OPENCODE: string;
		LANG: string;
		buildPhase: string;
		XCURSOR_PATH: string;
		XDG_RUNTIME_DIR: string;
		CC: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		out: string;
		HYPRLAND_CMD: string;
		NO_AT_BRIDGE: string;
		patches: string;
		QML2_IMPORT_PATH: string;
		CXX: string;
		NIX_PATH: string;
		XDG_DATA_DIRS: string;
		propagatedBuildInputs: string;
		depsHostHost: string;
		name: string;
		WLR_NO_HARDWARE_CURSORS: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		XDG_SESSION_DESKTOP: string;
		CONFIG_SHELL: string;
		DESKTOP_SESSION: string;
		TERM_PROGRAM_VERSION: string;
		GHOSTTY_SHELL_FEATURES: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		LIBEXEC_PATH: string;
		NIX_BINTOOLS: string;
		CURRENT_FILE: string;
		NIX_LD: string;
		outputs: string;
		GHOSTTY_BIN_DIR: string;
		buildInputs: string;
		OBJCOPY: string;
		XDG_SESSION_CLASS: string;
		PWD: string;
		cmakeFlags: string;
		AS: string;
		mesonFlags: string;
		STARSHIP_SESSION_KEY: string;
		NODE_PATH: string;
		NIX_HARDENING_ENABLE: string;
		NIX_BUILD_CORES: string;
		NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		RUST_SRC_PATH: string;
		doInstallCheck: string;
		XDG_CURRENT_DESKTOP: string;
		GDM_LANG: string;
		QTWEBKIT_PLUGIN_PATH: string;
		XDG_CONFIG_DIRS: string;
		depsBuildBuildPropagated: string;
		TERMINFO_DIRS: string;
		GHOSTTY_RESOURCES_DIR: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		HYPRCURSOR_THEME: string;
		GDMSESSION: string;
		QT_STYLE_OVERRIDE: string;
		XDG_SESSION_ID: string;
		GTK_PATH: string;
		HYPRCURSOR_SIZE: string;
		AGENT: string;
		XDG_SEAT: string;
		SSH_AUTH_SOCK: string;
		STRINGS: string;
		WAYLAND_DISPLAY: string;
		NIX_LD_LIBRARY_PATH: string;
		system: string;
		TERMINFO: string;
		READELF: string;
		NU_VERSION: string;
		XDG_SESSION_TYPE: string;
		DISPLAY: string;
		GI_TYPELIB_PATH: string;
		STARSHIP_SHELL: string;
		depsBuildBuild: string;
		LOCALE_ARCHIVE_2_27: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		DIRENV_DIR: string;
		BUN_BE_BUN: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_GEMINI_API_KEY: string;
		PUBLIC_ELEVENLABS_API_KEY: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
