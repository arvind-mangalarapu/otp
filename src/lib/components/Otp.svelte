<script>
	// Define the input configuration using Svelte's reactive declaration
	let inputs = [
		{ id: 'myInput1', next: 'myInput2', prev: null, value: '' },
		{ id: 'myInput2', next: 'myInput3', prev: 'myInput1', value: '' },
		{ id: 'myInput3', next: 'myInput4', prev: 'myInput2', value: '' },
		{ id: 'myInput4', next: 'myInput5', prev: 'myInput3', value: '' },
		{ id: 'myInput5', next: 'myInput6', prev: 'myInput4', value: '' },
		{ id: 'myInput6', next: null, prev: 'myInput5', value: '' }
	];

	// Function to update the input value
	function handleInput(event, index) {
		const input = event.target;
		const value = input.value.trim();

		// Validate and update input value
		if (/^[0-9]$/.test(value)) {
			inputs[index].value = value;
			handleTab(event, index);
		} else {
			input.value = ''; // Clear input if not a single digit
		}
	}

	// Function to move focus to the next input
	function handleTab(event, index) {
		const nextInputId = inputs[index].next;
		if (nextInputId) {
			const nextInput = document.getElementById(nextInputId);
			if (nextInput) {
				nextInput.focus();
			}
		}
	}

	// Handle Backspace key press
	function handleBackspace(event, index) {
		if (event.key === 'Backspace') {
			const input = event.target;
			if (input.value === '') {
				const prevInputId = inputs[index].prev;
				if (prevInputId) {
					const prevInput = document.getElementById(prevInputId);
					if (prevInput) {
						prevInput.focus();
					}
				}
				event.preventDefault(); // Prevent default behavior
			}
		}
	}
</script>

<main class="flex flex-col items-center justify-center h-screen bg-black text-white">
	<div class="flex items-center justify-center gap-5">
		{#each inputs as input, index}
			<div class="input-container">
				<input
					type="number"
					id={input.id}
					class="h-20 w-20 text-5xl text-center bg-transparent border-b-2 border-gray-600 focus:outline-none no-spinner text-white"
					bind:value={input.value}
					on:input={(event) => handleInput(event, index)}
					on:keydown={(event) => handleBackspace(event, index)}
					min="0"
					max="9"
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
