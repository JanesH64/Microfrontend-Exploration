<style>
    .header {
    background-color: lightblue;
    padding: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    }

    .spacer {
        flex: 1 1 auto;
    }

    h1 {
        margin: 0;
    }
</style>

<div class='header'>
    <h1>MFE Header</h1>
    <div class="spacer"></div>
    <div>Counter: {counter}</div>
</div>

<script>
	export let counter = 0;
</script>