{#await import("Header/Header")}
    <div>Loading...</div>
{:then Header}
	<Header.default counter={counter} />
{:catch error}
    <p>{error.message}</p>
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