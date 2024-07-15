<script>
	import { onMount } from 'svelte';

	let hour = 0;
	let minute = 0;
	let second = 0;
	let theme = 'minimalist';

	function updateClock() {
		const now = new Date();
		hour = (now.getHours() % 12) + now.getMinutes() / 60;
		minute = now.getMinutes() + now.getSeconds() / 60;
		second = now.getSeconds();
	}

	function changeTheme(newTheme) {
		theme = newTheme;
	}

	onMount(() => {
		updateClock();
		const interval = setInterval(updateClock, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center h-screen justify-center bg-black space-y-4">
	<div class="flex space-x-2 mb-4">
		<button on:click={() => changeTheme('minimalist')} class="px-4 py-2 bg-gray-200 rounded"
			>Minimalist</button
		>
		<button on:click={() => changeTheme('retro')} class="px-4 py-2 bg-gray-200 rounded"
			>Retro</button
		>
		<button on:click={() => changeTheme('modern')} class="px-4 py-2 bg-gray-200 rounded"
			>Modern</button
		>
		<button on:click={() => changeTheme('classic')} class="px-4 py-2 bg-gray-200 rounded"
			>Classic</button
		>
		<button on:click={() => changeTheme('futuristic')} class="px-4 py-2 bg-gray-200 rounded"
			>Futuristic</button
		>
	</div>

	<div
		class={`relative w-64 h-64 border-4 rounded-full ${
			theme === 'minimalist'
				? 'border-gray-400'
				: theme === 'retro'
					? 'border-yellow-600'
					: theme === 'modern'
						? 'border-blue-600'
						: theme === 'classic'
							? 'border-green-900'
							: 'border-green-500'
		} ${
			theme === 'minimalist'
				? 'ring-gray-400'
				: theme === 'retro'
					? 'ring-yellow-600'
					: theme === 'modern'
						? 'ring-blue-600'
						: theme === 'classic'
							? 'ring-yellow-600'
							: 'ring-pink-500'
		}`}
	>
		<!-- Hour Hand -->
		<div
			class={`hand hour ${
				theme === 'minimalist'
					? 'bg-gray-800'
					: theme === 'retro'
						? 'bg-yellow-900'
						: theme === 'modern'
							? 'bg-blue-800'
							: theme === 'classic'
								? 'bg-red-600'
								: 'bg-yellow-400'
			}`}
			style="transform: rotate({hour * 30}deg);"
		></div>
		<!-- Minute Hand -->
		<div
			class={`hand minute ${
				theme === 'minimalist'
					? 'bg-gray-900'
					: theme === 'retro'
						? 'bg-green-500'
						: theme === 'modern'
							? 'bg-teal-400'
							: theme === 'classic'
								? 'bg-gray-600'
								: 'bg-cyan-400'
			}`}
			style="transform: rotate({minute * 6}deg);"
		></div>
		<!-- Second Hand -->
		<div
			class={`hand second ${
				theme === 'minimalist'
					? 'bg-gray-500'
					: theme === 'retro'
						? 'bg-red-800'
						: theme === 'modern'
							? 'bg-red-500'
							: theme === 'classic'
								? 'bg-red-600'
								: 'bg-pink-400'
			}`}
			style="transform: rotate({second * 6}deg);"
		></div>
		<!-- Center Dot -->
		<div
			class="absolute w-4 h-4 bg-yellow-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
		></div>
	</div>
</div>

<style>
	.hand {
		position: absolute;
		width: 50%;
		top: 50%;
		transform-origin: 100%;
	}
	.hour {
		height: 6px;
	}
	.minute {
		height: 3px;
	}
	.second {
		height: 1px;
	}
</style>
