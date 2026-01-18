<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import type { PerspectiveCamera } from 'three';
</script>

<div class="threlte-container">
	<Canvas>
		<T.PerspectiveCamera
			makeDefault
			position={[5, 4, 5]}
			fov={50}
			oncreate={(ref: PerspectiveCamera) => {
				ref.lookAt(0, 0, 0);
			}}
		/>

		<T.DirectionalLight position={[0, 10, 10]} intensity={1} />
		<T.AmbientLight intensity={0.5} />

		<T.Mesh position.y={0}>
			<T.BoxGeometry args={[2, 2, 2]} />
			<T.MeshStandardMaterial color="#6366f1" />
		</T.Mesh>

		<T.Mesh rotation.x={-Math.PI / 2} position.y={-1.5}>
			<T.PlaneGeometry args={[20, 20]} />
			<T.MeshStandardMaterial color="#1e293b" />
		</T.Mesh>
	</Canvas>
</div>

<style>
	.threlte-container {
		width: 100%;
		height: 100%;
		min-height: 100%;
		background: red; /* Debug: should be visible if container renders */
	}

	.threlte-container :global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}
</style>
