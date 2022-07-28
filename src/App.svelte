<script>
    import ProgressCounter from "./lib/ProgressCounter.svelte";
    import Historic from "./lib/Historic.svelte";
    import ToggleTheme from "./lib/ToggleTheme.svelte";

    let progress_counter_component;
    let history_component;

    import { onMount } from "svelte";
    import { last_try_time } from "./stores";

    const progress_reset_handler = (event) => {
        history_component.generate_report(event.detail, $last_try_time);
        last_try_time.update(() => Date.now().toString());
    };

    onMount(() => {
        if (!$last_try_time) last_try_time.update(() => Date.now().toString());
        setInterval(() => progress_counter_component.update_progress($last_try_time), 1000);
    });
</script>

<main class="container mt-4 p-4 m-auto max-w-4xl">
    <header class="flex justify-between items-center gap-2">
        <div>
            <h1 class="text-3xl font-bold"><span class="text-primary">Bad</span> Tracker</h1>
            <p>Track your <class class="text-primary">bad</class> habits and get a better</p>
        </div>
        <ToggleTheme />
    </header>

    <ProgressCounter
        bind:this={progress_counter_component}
        on:progress_reset={progress_reset_handler}
    />
    <Historic bind:this={history_component} />
</main>
