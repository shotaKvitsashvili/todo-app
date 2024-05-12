<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import loaderGif from "$lib/images/loading.gif";
    import TodoCard from "./TodoCard.svelte";
    import { todoStore } from "../../../store/todoStore";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Input from "../ui/input.svelte";

    let queryParams: URLSearchParams = $page.url.searchParams;
    let searchKey = queryParams.get("q");

    let timerId: any;

    const { subscribe, getTodo } = todoStore;
    let { data, error, loading, todosAreEmpty } = $todoStore;

    const unsubscribe = subscribe((value) => {
        data = value.data;
        error = value.error;
        loading = value.loading;
        todosAreEmpty = value.todosAreEmpty;
    });

    const handleChange = (e: Event) => {
        const isAlphaNumeric = e instanceof KeyboardEvent && (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete")
        
        if (typeof window !== "undefined" && isAlphaNumeric) {
            const { value } = e.target as HTMLInputElement;
            queryParams.set("q", value);

            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(() => {
                getTodo("todoBody_like=" + value);
                goto(`?${queryParams.toString()}`, {
                    keepFocus: true,
                    replaceState: true,
                });
                timerId = null;
            }, 200);
        }
    };

    onMount(() => {
        getTodo(searchKey ? "todoBody_like=" + searchKey : undefined);
    });

    onDestroy(unsubscribe);
</script>

<div class="flex flex-col gap-2">
    {#if error}
        <span class="text-center">
            {error}
        </span>
    {/if}

    <Input {handleChange} value={searchKey ?? ""} type="text" name="searchKey" placeholder="Search todo..." />

    {#if loading}
        <img src={loaderGif} alt="loader" class="w-28 h-28 mx-auto" />
    {:else}
        {#each data as todo}
            <TodoCard {todo} {getTodo} />
        {/each}
    {/if}

    {#if todosAreEmpty}
        <span class="text-center">No todos found!</span>
    {/if}
</div>
