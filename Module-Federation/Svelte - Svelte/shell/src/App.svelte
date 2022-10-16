{#await import("Header/Header") then Header}
	<Header.default counter={counter} />
{/await}

<div class="container">
    <div>Shell Page</div>
    <div>{counter}</div>
    <button on:click={increaseCounter}>Increase counter</button>
</div>

<script>
    let counter = 0;

    function increaseCounter() {
        counter++;
    }
</script>