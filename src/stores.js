import { writable } from "svelte/store";

export let tries = writable(localStorage.getItem("tries") || "0");
tries.subscribe((v) => localStorage.setItem("tries", v));

export let last_try_time = writable(localStorage.getItem("last_try_time") || "");
last_try_time.subscribe((v) => localStorage.setItem("last_try_time", v));

export let history = writable(localStorage.getItem("history") || "");
history.subscribe((v) => localStorage.setItem("history", v));

export let theme = writable(localStorage.getItem("theme") || "emerald");
theme.subscribe((v) => localStorage.setItem("theme", v));
