<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let timerInterval;
	let startTime = 0;
	let elapsedTime = 0;
	let laps = [];

	// Stores for digital display and running state
	const displayTime = writable('00:00:00.000');
	const running = writable(false);

	// Function to update the digital timer display
	function updateDisplay() {
		const hours = Math.floor(elapsedTime / 3600000)
			.toString()
			.padStart(2, '0');
		const minutes = Math.floor((elapsedTime % 3600000) / 60000)
			.toString()
			.padStart(2, '0');
		const seconds = Math.floor((elapsedTime % 60000) / 1000)
			.toString()
			.padStart(2, '0');
		const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
		displayTime.set(`${hours}:${minutes}:${seconds}.${milliseconds}`);

		// Calculate rotation degrees
		const rotationDegrees = (elapsedTime / 1000) * 6; // 6 degrees per second
		document.getElementById('timer').style.transform = `rotate(${rotationDegrees}deg)`;
		document.getElementById('center-dot').style.transform = `rotate(${rotationDegrees}deg)`;
	}

	// Function to start the stopwatch
	function start() {
		if (!$running) {
			startTime = Date.now() - elapsedTime;
			timerInterval = setInterval(() => {
				elapsedTime = Date.now() - startTime;
				updateDisplay();
			}, 100); // Update display every 100ms
			running.set(true); // Update running state
		}
	}

	// Function to stop the stopwatch
	function stop() {
		clearInterval(timerInterval);
		running.set(false);
	}

	// Function to record a lap
	function lap() {
		const lapTime = $displayTime;
		laps = [...laps, lapTime]; // Push the current displayTime value to laps array
	}

	// Function to reset the stopwatch
	function reset() {
		clearInterval(timerInterval);
		elapsedTime = 0;
		laps = [];
		updateDisplay();
		document.getElementById('timer').style.transform = `rotate(0deg)`; // Reset rotation
		running.set(false);
	}

	// Lifecycle hooks
	onMount(() => {
		updateDisplay();
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});
</script>

<main class="flex flex-row items-center w-full h-screen bg-black text-white">
	<div class="flex flex-col items-center mr-8 mx-auto">
		<div
			class="h-48 w-48 border-4 border-b-red-600 border-l-yellow-600 border-t-blue-600 border-r-lime-600 rounded-full flex justify-center items-center"
		>
			<div
				id="center-dot"
				class="h-5 w-5 bg-gradient-to-t from-red-800 via-yellow-600 to-red-800 rounded-full m-auto absolute z-30"
				style="transform: rotate(20deg);"
			></div>
			<!-- Timer bar -->
			<div
				id="timer"
				class="h-[90px] bg-gradient-to-t from-red-800 via-yellow-600 to-blue-700 w-[3px] transform origin-bottom inset-x-[50%] p-0 m-0 duration-1000 ease-linear self-start"
				style="transform: rotate(0deg);"
			></div>
		</div>

		<!-- Digital timer display -->
		<div class="text-4xl mb-4 max-w-full mx-auto">{$displayTime}</div>

		<!-- Control buttons -->
		<div class="flex space-x-4">
			<button
				on:click={start}
				class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Start</button
			>
			<button on:click={stop} class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
				>Stop</button
			>
			<button on:click={lap} class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
				>Lap</button
			>
			<button on:click={reset} class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
				>Reset</button
			>
		</div>
	</div>

	<!-- Laps display on the side -->
	<div
		class="flex flex-col items-start bg-black p-4 w-1/2 pl-[20%]
  "
	>
		<p class="text-xl font-bold mb-2 text-white">Laps</p>
		<ul class="text-lg">
			{#each laps as lap, index}
				<li>{index + 1}. {lap}</li>
			{/each}
		</ul>
	</div>
</main>
