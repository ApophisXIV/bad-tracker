<script>
    import { onMount } from "svelte";
    import { theme } from "../stores";

    onMount(() => set_theme());

    const set_theme = () => document.querySelector("html").setAttribute("data-theme", $theme);
    const change_theme = () => {
        if ($theme === "emerald") $theme = "night";
        else $theme = "emerald";
        set_theme();
    };
</script>

<input type="checkbox" class="toggle" on:click={change_theme} checked={$theme === "night"} />
