<script lang="ts">
    import todoSvg from '$lib/images/icons/todo.svg'
    import chartSvg from '$lib/images/icons/chart.svg'
    import logo from '$lib/images/todo-logo.png'

    type TMenuItems = {
        name: string;
        url: string;
        imgSrc: string;
    };
    
    const menuItems: TMenuItems[] = [
        {
            name: "Todos",
            url: "/",
            imgSrc: todoSvg
        },
        {
            name: "Charts",
            url: "/charts",
            imgSrc: chartSvg
        },
    ];
</script>

<header>
    <nav
        class="block w-full p-4 mx-auto text-white bg-white border shadow-md border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4"
    >
        <ul
            class="flex gap-2 items-center lg:gap-6 container"
        >
            <li class="h-10 w-10 mr-auto">
                <a href="/">
                    <img src={logo} alt="todo">
                </a>
            </li>
            {#each menuItems as menuItem}
                <li
                    class="flex items-center font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900"
                >
                    <a href={menuItem.url} class="flex items-center gap-2">
                        <img class="w-4 h-4" src={menuItem.imgSrc} alt={menuItem.name} />

                        {menuItem.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style>
</style>
