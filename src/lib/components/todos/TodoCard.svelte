<script lang="ts">
    import { createForm } from "svelte-forms-lib";
    import type { Method } from "axios";
    import { format, parse } from "date-fns";
    import classnames from "classnames";

    import { todoSchema, type TAddTodo } from "../todo-form/validationSchema";
    import Input from "../ui/input.svelte";
    import { todoStatusEnums } from "$lib/enums/todoEnums";
    import { httpRequest, type ApiResponse } from "../../../utils/httpRequest";
    import deleteIcon from "$lib/images/icons/thrash-can.svg";
    import editIcon from "$lib/images/icons/pencil.svg";
    import checkIcon from "$lib/images/icons/check.svg";
    import Datepicker from "../todo-form/datepicker.svelte";
    import { todoRadioFields } from "../todo-form/todoFields";
    import { DATE_FORMAT } from "$lib/constants/dateFormat";
    import { todosEndpoint } from "$lib/constants/endpoints";

    type Props = {
        getTodo: () => Promise<void>;
        todo: TTodoResponse;
    };

    const { todo, getTodo }: Props = $props();
    let editable: boolean = $state(false);
    let requestDelete: boolean = $state(false);

    const { todoBody, expireDate, priority, id, status, finishedAt } = todo;

    const {
        errors,
        handleChange,
        updateField,
        isValid,
        handleSubmit,
        isModified,
    } = createForm<TAddTodo>({
        initialValues: {
            todoBody,
            expireDate,
            priority,
        },
        validationSchema: todoSchema,
        onSubmit: (values: TAddTodo) => {
            $isModified && updateTodo("update", values);
        },
    });

    async function updateTodo(
        updateType: "delete" | "statusUpdate" | "update",
        values?: any,
    ) {
        let requestBody,
            requestMethod: Method = "PUT";

        switch (updateType) {
            case "update":
                requestBody = {
                    ...values,
                    priority: Number(values?.priority),
                    status,
                    finishedAt,
                };
                break;

            case "delete":
                requestMethod = "DELETE";
                break;

            case "statusUpdate":
                requestBody = { ...values };
                requestMethod = "PATCH";
                break;

            default:
                break;
        }

        try {
            const response: ApiResponse<TAddTodo> = await httpRequest<TAddTodo>(
                requestMethod,
                `${todosEndpoint}/${id}`,
                requestBody,
            );

            response && getTodo();
        } catch (error) {
            console.log(error);
        }
    }

    let isExpired =
            parse(
                expireDate as string,
                DATE_FORMAT,
                new Date(),
            ).getTime() < new Date().getTime(),
        isFinished = status === todoStatusEnums.completed,
        isOngoing = status === todoStatusEnums.ongoing && !isExpired;

    let todoStatus = classnames({
        Finished: isFinished && !isExpired,
        Ongoing: isOngoing && !isExpired,
        Expired: isExpired,
    });
</script>

<div
    class="{classnames(
        `
        px-4 
        pb-2 
        w-full 
        leading-tight 
        transition-all 
        rounded-lg 
        text-start 
        hover:bg-opacity-80 
        hover:text-blue-gray-900 
        `,
        {
            '!bg-blue-gray-50': editable,
            'bg-green-100': isFinished,
            'bg-yellow-100': isOngoing,
            'bg-red-100/50': isExpired,
        },
    )}
"
>
    <form
        class:valid={$isValid}
        onsubmit={handleSubmit}
    >
        <div class="flex items-stretch gap-4">
            <div
                class="flex-1 {editable
                    ? ''
                    : 'opacity-90 pointer-events-none cursor-default'}"
            >
                <div class="-ml-4 [&_textarea]:text-lg">
                    <Input
                        type="textarea"
                        name="todoBody"
                        {handleChange}
                        {errors}
                        value={todoBody}
                        readOnly={!editable}
                    />
                </div>

                {#if !isFinished}
                    <div
                        class="[&_input]:!bg-transparent [&_input]:!text-gray-600 flex items-center gap-2 text-sm"
                    >
                        {isExpired ? "Expired" : "Expires"} at:
                        <Datepicker
                            {updateField}
                            defaultDate={expireDate}
                            hideLabel
                        />
                    </div>
                {/if}

                <div class="my-1">
                    <h6
                        class="block font-sans text-sm antialiased font-[600] leading-relaxed tracking-normal text-blue-gray-900"
                    >
                        Priority
                    </h6>

                    <div
                        class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3"
                    >
                        {#each todoRadioFields as field}
                            <Input
                                {...field}
                                {handleChange}
                                {errors}
                                defaultChecked={field.value === priority}
                            />
                        {/each}
                    </div>
                </div>
            </div>
            {#if !isExpired}
                <label
                    class="relative flex items-center h-fit mt-4 rounded-full cursor-pointer {editable ? 'pointer-events-none' : ''}"
                >
                <input
                    type="checkbox"
                    onchange={(e: Event) => {
                        const checked = (e.target as HTMLInputElement).checked;

                        updateTodo("statusUpdate", {
                                ...todo,
                                status: checked ? todoStatusEnums.completed : todoStatusEnums.ongoing,
                                finishedAt: checked? format(new Date(Date.now()), DATE_FORMAT) : null
                            })
                    }}
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="checkbox"
                    checked={isFinished}
                />
                <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </span>
                </label>
            {/if}
        </div>
    
        <div class="flex justify-between items-end text-sm">
            <span class="text-gray-600">
                Status: <span class="font-bold text-gray-900">{todoStatus}</span>
            </span>

                <div class="text-sm text-gray-600 flex flex-col items-end">
                    <div class="flex items-start gap-2 mt-2">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <button
                            type="submit"
                            onclick={(e) => {
                                if (!isFinished) {
                                    !editable && e.preventDefault();
                                    editable = !editable;
                                    requestDelete = false;
                                }
                            }}
                            class={isFinished ? "cursor-not-allowed" : ""}
                        >
                            <img
                                src={editable ? checkIcon : editIcon}
                                alt="edit"
                                class="w-4 h-4 transition-all hover:scale-[1.1]"
                            />
                        </button>
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <img
                            src={deleteIcon}
                            alt="delete"
                            class="w-4 h-4 transition-all hover:scale-[1.1] cursor-pointer"
                            onclick={() => {
                                requestDelete = true;
                                editable = false;
                            }}
                        />
                    </div>
                {#if finishedAt}
                    Finished at: <span class="font-bold text-gray-900"
                        >{finishedAt}</span
                    >
                    {/if}
                </div>
        </div>
    </form>
</div>

{#if requestDelete}
    <div class="text-sm">
        <span class=" text-sm">Do you really want to delete this todo?</span>

        <div class="flex items-center gap-2 [&_div]:cursor-pointer">
            <button
                class="underline text-red-400 hover:no-underline"
                onclick={() => updateTodo("delete")}>Delete</button
            >
            <button class="" onclick={() => (requestDelete = false)}
                >Cancel</button
            >
        </div>
    </div>
{/if}

<div class="px-2 last-of-type:hidden">
    <!-- svelte-ignore component_name_lowercase -->
    <hr />
</div>
