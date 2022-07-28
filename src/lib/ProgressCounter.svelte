<script>
    import { time_to_elapsed_percentage, time_to_elapsed_string } from "../utils";
    import { tries } from "../stores";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let progress = 0;
    let elapsed_days = 0;
    let elapsed_hours = 0;
    let elapsed_minutes = 0;
    let elapsed_seconds = 0;

    export const update_progress = (last_time) => {
        const elapsed = time_to_elapsed_string(Date.now() - last_time);
        elapsed_days = elapsed.days;
        elapsed_hours = elapsed.hours;
        elapsed_minutes = elapsed.minutes;
        elapsed_seconds = elapsed.seconds;

        progress = time_to_elapsed_percentage(last_time) - 100 * elapsed.days;
    };

    const add_attempt = () => ($tries = (parseInt($tries) + 1).toString());
    const add_completed_attempt = () => {
        dispatch("progress_reset", $tries);
        $tries = "0";
    };
</script>

<div class="container flex flex-col items-center mt-10">
    <div
        class="radial-progress border border-primary text-primary "
        style="--value:{progress}; --size:220px; --thickness: 4px;"
    >
        <div class="flex">
            <div class="w-12">
                <span class="countdown font-mono text-xl">
                    <span style="--value:{elapsed_days};" />
                </span>
                days
            </div>
            <div class="w-14">
                <span class="countdown font-mono text-xl">
                    <span style="--value:{elapsed_hours};" />
                </span>
                hours
            </div>
            <div class="w-12">
                <span class="countdown font-mono text-xl">
                    <span style="--value:{elapsed_minutes};" />
                </span>
                min
            </div>
            <div class="w-6">
                <span class="countdown font-mono text-xl">
                    <span style="--value:{elapsed_seconds};" />
                </span>
                sec
            </div>
        </div>
    </div>
    <div class="mt-5 flex gap-10">
        <div class="indicator">
            <span class="indicator-item indicator-bottom badge">{$tries}</span>
            <button class="btn w-24 btn-warning" on:click={add_attempt}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </button>
        </div>
        <button class="btn w-24 btn-accent" on:click={add_completed_attempt}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </button>
    </div>
</div>
