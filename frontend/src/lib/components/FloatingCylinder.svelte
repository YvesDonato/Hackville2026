<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Decal } from '@threlte/extras';
	import * as THREE from 'three';
	import type { Mesh } from 'three';
	import type { Persona } from '$lib/types';

	let { persona = null }: { persona?: Persona | null } = $props();

	let cylinderRef: Mesh | null = $state(null);
	const floatBaseY = 0;
	const floatAmplitude = 0.11;
	const floatSpeed = 0.5;
	const tiltAmplitude = 0.12;

	// const tiltAmplitude = 10;
  const tiltSpeed = 0.6;
	let elapsed = 0;

	// Load textures using THREE.TextureLoader
	const textureLoader = new THREE.TextureLoader();
	const textures: Record<string, THREE.Texture> = {
		male: textureLoader.load('/BlueHeart.png'),
		female: textureLoader.load('/SarahTheSquare.png'),
		discord_kitten: textureLoader.load('/discordKitten.png')
	};

	useTask((delta) => {
		if (!cylinderRef) return;
		elapsed += delta;
		cylinderRef.position.y = floatBaseY + Math.sin(elapsed * floatSpeed) * floatAmplitude;
		cylinderRef.rotation.z = Math.sin(elapsed * tiltSpeed) * tiltAmplitude;
	});

</script>

<T.Mesh
	rotation.x={Math.PI / 2}
	oncreate={(ref: Mesh) => {
		cylinderRef = ref;
	}}
>
	<T.CylinderGeometry args={[1.2, 1.2, 1.2, 48]} />
	<T.MeshStandardMaterial color="#9ca3af" roughness={0.6} metalness={0.1} />

	{#if persona && textures[persona]}
		<Decal
			position={[0, 1, 0]}
			rotation={[Math.PI/2, 0, Math.PI]}
			scale={1.5}
		>
			<T.MeshBasicMaterial
				map={textures[persona]}
				polygonOffset
				polygonOffsetFactor={-10}
				transparent
			/>
		</Decal>
	{/if}
</T.Mesh>
