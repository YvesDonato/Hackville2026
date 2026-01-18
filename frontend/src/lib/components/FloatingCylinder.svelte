<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Mesh } from 'three';

	let cylinderRef: Mesh | null = null;
	const floatBaseY = 0;
	const floatAmplitude = 0.11;
	const floatSpeed = 0.5;
	const tiltAmplitude = 0.12;
	const tiltSpeed = 0.6;
	let elapsed = 0;

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
</T.Mesh>
