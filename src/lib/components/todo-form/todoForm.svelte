<script lang="ts">
    import { createForm } from "svelte-forms-lib";

    import { todoSchema, type TAddTodo } from "./validationSchema";
    import { todoFields, todoRadioFields } from "./todoFields";
    import Input from "../ui/input.svelte";
    import { type ApiResponse, httpRequest } from "../../../utils/httpRequest";
    import { todoPriorityEnums, todoStatusEnums } from "$lib/enums/todoEnums";
    import Datepicker from "./datepicker.svelte";
    import { todosEndpoint } from "$lib/constants/endpoints";

    let created: boolean = $state(false);
    
    const {
        errors,
        isValid,
        isSubmitting,
        handleChange,
        handleSubmit,
        updateField,
    } = createForm<TAddTodo>({
        initialValues: {
            todoBody: "",
            expireDate: "",
            priority: todoPriorityEnums.high,
        },
        validationSchema: todoSchema,
        onSubmit: async (values: TAddTodo) => {
            try {
                const response: ApiResponse<TAddTodo> =
                    await httpRequest<TAddTodo>("POST", todosEndpoint, {
                        ...values,
                        priority: Number(values.priority),
                        status: todoStatusEnums.ongoing,
                        finishedAt: null
                    });
                if (response) {
                    created = true;
                }
                setTimeout(() => {
                    created = false;
                }, 1000);
            } catch (error) {
                created = false;
            }
        },
    });
</script>

<div
    class="relative flex flex-col text-gray-700 bg-transparent shadow p-3 rounded-xl bg-white w-full lg:w-fit mx-auto"
>
    <form
        class:valid={$isValid}
        onsubmit={handleSubmit}
        class="mt-8 mb-2 w-full lg:w-80"
    >
        <div class="flex flex-col gap-5 mb-1">
            {#each todoFields as field}
                {#if field.name === "expireDate"}
                    <Datepicker {updateField} />
                {:else}
                    <Input {...field} {handleChange} {errors} />
                {/if}
            {/each}

            <div>
                <h6
                    class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
                >
                    Priority
                </h6>

                <div class="flex flex-col md:flex-row md:items-center md:gap-3">
                    {#each todoRadioFields as field}
                        <Input {...field} {handleChange} {errors} />
                    {/each}
                </div>
            </div>
        </div>

        <button
            class="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            disabled={$isSubmitting || !$isValid}
            style="pointer-events: {created ? 'none' : ''};"
            data-ripple-light="true"
        >
            {created ? "created ✅" : "create"}
        </button>
    </form>
</div>

<style scoped>
</style>
