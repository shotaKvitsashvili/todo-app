<script lang="ts">
    import { onMount } from "svelte";

    import { httpRequest, type ApiResponse } from "../../../utils/httpRequest";
    import loaderGif from "$lib/images/loading.gif";
    import TodoCard from "./TodoCard.svelte";

    let data: TTodoResponse[] = $state([]);
    let error: string = $state("");
    let loading: boolean = $state(false);
    let todosAreEmpty: boolean = $state(false);

    const getTodo = async () => {
        try {
            loading = true;
            const response: ApiResponse<TTodoResponse[]> =
                await httpRequest<any>("GET", "/todos?_sort=priority");
            loading = false;

            if (response.error) {
                error = response.error;
            } else {
                data = response.data;
                todosAreEmpty = response.data.length < 1;
            }
        } catch (error) {
            error = "Error occured";
        }
    };

    onMount(() => {
        getTodo();
    });
</script>

<div class="flex flex-col gap-2">
    {#if error}
        <span class="text-center">
            {error}
        </span>
    {/if}

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
