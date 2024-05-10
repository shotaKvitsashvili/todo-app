<script lang="ts">
</script>

<div
    class="relative flex flex-col text-gray-700 bg-transparent shadow p-3 rounded-xl bg-white w-full lg:w-fit mx-auto"
>
    <form class="mt-8 mb-2 w-full lg:w-80">
        <div class="flex flex-col gap-6 mb-1">
            <h6
                class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
            >
                Your Name
            </h6>
            <div class="relative h-11 w-full lg:min-w-[200px]">
                <input
                    placeholder="name@mail.com"
                    class="py-2 px-4 text-sm w-full rounded-md border border-blue-gray-300 !outline-none"
                />
                <label
                    for=""
                    class=""
                ></label>
            </div>
            <h6
                class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
            >
                Your Email
            </h6>
            <div class="relative h-11 w-full lg:min-w-[200px]">
                <input
                    placeholder="name@mail.com"
                    class="py-2 px-4 text-sm w-full rounded-md border border-blue-gray-300 !outline-none"
                />
                <label
                    for=""
                    class=""
                ></label>
            </div>
        </div>

        <button
            class="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
        >
            sign up
        </button>
    </form>
</div>


<style scoped>
    /* .input-label::before,
    .input-label::after {
        content: '';
        pointer-events: none;
        margin-top: 6.5px;
        margin-right: 4px;
        display: block;
        height: 5px;
        width: 9px;
        border-top-left-radius: 6px;
        border: 1px solid;
        border-bottom: none;
        border-right: none;
        border: rgb(128, 128, 128);
    }

    .input-label::after {
        margin-left: 4px;
        flex-grow: 1;
        border-top-right-radius: 6px;
        border-bottom: 1px solid;
        border-left: none;
    } */
</style>