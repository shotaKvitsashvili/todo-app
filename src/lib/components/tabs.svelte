<script lang="ts">
    let { items } = $props<{ items: tabItems[] }>();

    let activeTabValue: number = $state(1);
    const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<div class="relative right-0 w-full bg-white rounded-xl shadow-2xl p-4 pt-8">
    <ul
        class="relative flex flex-wrap p-1 list-none rounded-lg bg-blue-gray-50/60 mb-4 lg:mb-8"
        data-tabs="tabs"
        role="list"
    >
        {#each items as item}
            <li class="z-30 flex-auto text-center">
                <div
                    class="
                    flex
                    items-center
                    justify-center
                    w-full
                    py-1
                    transition-all
                    ease-in-out
                    rounded-lg
                    cursor-pointer
                    text-slate-700
                    {activeTabValue === item.value ? 'bg-gray-300' : ''}"
                    on:click={handleClick(item.value)}
                >
                    <span>{item.label}</span>
                </div>
            </li>
        {/each}
    </ul>

    {#each items as item}
        {#if activeTabValue == item.value}
            <svelte:component this={item.component} />
        {/if}
    {/each}
</div>

<style>
</style>
