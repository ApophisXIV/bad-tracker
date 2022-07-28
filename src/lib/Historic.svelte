<script>
    import { onMount } from "svelte";
    import { history } from "../stores";
    import { time_to_elapsed_string } from "../utils";

    const add_new_entry = (entry) => {
        const table = document.querySelector("#daily_report_table");
        const duration = time_to_elapsed_string(entry.duration);
        table.innerHTML += `
        <tr>
            <th>${table.childElementCount + 1}</th>
            <td>${entry.start_date}</td>
            <td class="font-normal">
                ${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s
            </td>
            <td>${entry.tries}</td>
        </tr>
        `;
    };

    export const generate_report = (tries, start_time) => {
        const time = new Date();
        const duration = time.getTime() - start_time;
        const start_date = time.toLocaleString("es-ES").replace(",", "");

        const new_entry = { start_date, duration, tries };

        history.update((h) => `${Object.values(new_entry)};${h}`);
        add_new_entry(new_entry);
    };

    onMount(() => {
        if (!$history.length) return;
        $history
            .split(";")
            .map((e) => e.split(","))
            .sort((a, b) => parseInt(b[1]) - parseInt(a[1]))
            .forEach((e) => {
                if (e.length < 3) return;
                add_new_entry({ start_date: e[0], duration: e[1], tries: e[2] });
            });
    });
</script>

<h2 class="text-2xl mt-10">Historical</h2>
<div class="overflow-x-auto mt-2">
    <table class="table table-compact w-full">
        <thead>
            <tr>
                <th />
                <th>Start date</th>
                <th>Duration</th>
                <th
                    ><svg
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
                    </svg></th
                >
            </tr>
        </thead>
        <tbody id="daily_report_table" />
    </table>
</div>
