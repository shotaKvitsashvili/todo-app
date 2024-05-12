<script lang="ts">

    import TodoForm from "$lib/components/todo-form/todoForm.svelte";
    import Tabs from "$lib/components/tabs.svelte";
    import TodoList from "$lib/components/todos/TodoList.svelte";


    let items: tabItems[] = [
        { label: "Todos", value: 1, component: TodoList },
        { label: "Create Todo", value: 2, component: TodoForm },
    ];
</script>

<svelte:head>
    <title>Todos</title>
</svelte:head>
<div class="container">
    <div class="lg:max-w-[800px] mx-auto mt-14 p-3 lg:px-10">
        <Tabs items={items} />
    </div>
</div>
