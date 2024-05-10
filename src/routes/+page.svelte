<script lang="ts">
    import { onMount } from "svelte";

    import TodoForm from "$lib/components/todoForm.svelte";
    import { httpRequest, type ApiResponse } from "../utils/httpRequest";
    import Tabs from "$lib/components/tabs.svelte";
    import Header from "$lib/components/header/Header.svelte";

    let data: any = $state();
    let error: string = $state("");
    let loading: boolean = $state(false);

    let items: tabItems[] = [
        { label: "Todos", value: 1, component: Header },
        { label: "Create Todo", value: 2, component: TodoForm },
    ];

    onMount(async () => {
        loading = true;
        const response: ApiResponse<any> = await httpRequest<any>({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/todos",
        });
        loading = false;

        if (response.error) {
            error = response.error;
        } else {
            data = response.data;
        }
    });
</script>

<div class="container">
    <div class="lg:max-w-[800px] mx-auto mt-20 p-3 lg:px-10">
        <Tabs items={items} />
    </div>
</div>
