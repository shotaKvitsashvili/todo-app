<script lang="ts">
    import type { Writable } from "svelte/store";

    type Props = {
        handleChange: (event: Event) => any;
        errors?: Writable<Record<string, string>>;
        type: "text" | "radio" | "textarea" | "checkbox";
        name: string;
        label?: string;
        placeholder?: string;
        value?: any;
        defaultChecked?: boolean;
        readOnly?: boolean;
    };

    const {
        handleChange,
        errors,
        type,
        label,
        name,
        placeholder,
        value,
        defaultChecked,
        readOnly,
    }: Props = $props();
</script>

{#if type === "text"}
    <div class="w-full">
        <h6
            class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
        >
            {label}
        </h6>
        <div class="relative w-full lg:min-w-[200px]">
            <input
                {placeholder}
                type="text"
                {name}
                class="py-2 px-4 text-sm w-full rounded-md border border-blue-gray-300 !outline-none read-only:border-none read-only:bg-transparent"
                onkeyup={handleChange}
                value={value ?? ""}
                readonly={readOnly}
            />

            {#if $errors && $errors[name]}
                <small class="text-red-800">{$errors[name]}</small>
            {/if}
        </div>
    </div>
{:else if type === "radio"}
    <label
        class="relative flex items-center rounded-full cursor-pointer gap-1"
    >
        <div class="flex items-center relative">
            <input
                {name}
                {value}
                onchange={handleChange}
                type="radio"
                class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all"
                id="radio-bnt-{value}"
                checked={defaultChecked}
            />
            <span
                class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
            </span>
        </div>

        <div
            class="mt-px font-light text-gray-700 cursor-pointer select-none text-sm"
        >
            {label}
        </div>
    </label>
{:else if type === "textarea"}
    <div class="w-full">
        <h6
            class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
        >
            {label}
        </h6>
        <div class="relative w-full lg:min-w-[200px]">
            <textarea
                {placeholder}
                {name}
                class="py-2 px-4 text-sm w-full rounded-md border border-blue-gray-300 !outline-none readonly-input readonly-input__textarea"
                onkeyup={handleChange}
                value={value ?? ""}
                readonly={readOnly}
            ></textarea>

            {#if $errors && $errors[name]}
                <small class="text-red-800">{$errors[name]}</small>
            {/if}
        </div>
    </div>
{/if}

<style scoped>
    .readonly-input:read-only {
        border: none;
        background: transparent;
    }

    .readonly-input__textarea:read-only {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height: 60px;
        resize: none;
    }
</style>
