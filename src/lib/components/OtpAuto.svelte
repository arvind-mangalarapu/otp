<script>
	import { onMount, onDestroy } from 'svelte';

	// Function to generate a random 6-digit code
	function generateRandomCode() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	// Initialize inputs with empty values and navigation
	let inputs = [
		{ id: 'myInput1', next: 'myInput2', prev: null, value: '' },
		{ id: 'myInput2', next: 'myInput3', prev: 'myInput1', value: '' },
		{ id: 'myInput3', next: 'myInput4', prev: 'myInput2', value: '' },
		{ id: 'myInput4', next: 'myInput5', prev: 'myInput3', value: '' },
		{ id: 'myInput5', next: 'myInput6', prev: 'myInput4', value: '' },
		{ id: 'myInput6', next: null, prev: 'myInput5', value: '' }
	];

	// Function to fill all inputs with a new random code
	function fillInputs() {
		const code = generateRandomCode();
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = code[i];
		}
	}

	// Call fillInputs repeatedly every 2 seconds
	const interval = setInterval(fillInputs, 2000);

	// Clear interval on component destroy to stop updates
	onDestroy(() => {
		clearInterval(interval);
	});

	// Function to handle input change
	function handleInput(event, index) {
		const { value } = event.target;
		if (/^\d$/.test(value)) {
			// Ensure only one digit (0-9) is entered
			inputs[index].value = value; // Update value in inputs array
			handleTab(event, index);
		} else {
			event.target.value = ''; // Clear input if not a single digit
		}
	}

	// Function to handle Tab key navigation
	function handleTab(event, index) {
		const nextInputId = inputs[index].next;
		if (nextInputId) {
			const nextInput = document.getElementById(nextInputId);
			if (nextInput) nextInput.focus();
		}
	}

	// Function to handle Backspace key navigation
	function handleBackspace(event, index) {
		if (event.key === 'Backspace' && event.target.value === '') {
			const prevInputId = inputs[index].prev;
			if (prevInputId) {
				const prevInput = document.getElementById(prevInputId);
				if (prevInput) prevInput.focus();
			}
			event.preventDefault(); // Prevent default Backspace behavior
		}
	}
</script>

<main class="flex flex-col items-center justify-center h-screen bg-black text-white">
	<div class="flex items-center justify-center gap-5">
		{#each inputs as input, index}
			<div class="input-container">
				<input
					type="text"
					id={input.id}
					class="h-20 w-20 text-5xl text-center bg-transparent border-b-2 border-gray-600 focus:outline-none no-spinner text-white"
					bind:value={input.value}
					on:input={(event) => handleInput(event, index)}
					on:keydown={(event) => handleBackspace(event, index)}
				/>
			</div>
		{/each}
	</div>

	<div class="mt-5 p-4 bg-gray-800 rounded-lg">
		<p class="text-2xl">
			Input values: {inputs.map((input) => input.value).join(' ')}
		</p>
	</div>
</main>

<style>
	/* Custom caret styling */
	.input-container input:focus {
		caret-color: white;
	}
</style>
