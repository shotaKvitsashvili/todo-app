<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import { todoStore } from "../../store/todoStore";
    import BarChart from "$lib/components/charts/barChart.svelte";
    import loaderGif from "$lib/images/loading.gif";
    import PieChart from "$lib/components/charts/pieChart.svelte";

    const { subscribe, getTodo } = todoStore;

    let { data, loading } = $todoStore;

    const unsubscribe = subscribe((value) => {
        data = value.data;
        loading = value.loading;
    });

    onMount(() => {
        getTodo();
    });

    onDestroy(unsubscribe);
</script>

<svelte:head>
    <title>Charts</title>
</svelte:head>

<h1 class="text-center m-6 lg:mt-10 lg:mb-8 text-lg lg:text-2xl">Charts</h1>

{#if loading}
    <img src={loaderGif} alt="loader" class="w-28 h-28 mx-auto" />
{:else}
    <div
        class="flex
            flex-col
            gap-10
            [&_canvas]:!w-full
            [&_canvas]:object-contain
            [&_canvas]:max-h-[300px]
            [&_canvas]:lg:max-w-[600px]
            [&_canvas]:lg:mx-auto
            container
            "
    >
        <BarChart {data} />
        <PieChart {data} />
    </div>
{/if}
