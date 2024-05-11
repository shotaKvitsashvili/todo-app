<script lang="ts">
    import { DatePicker } from "@svelte-plugins/datepicker";
    import { format, parse } from "date-fns";

    type Props = {
        updateField: (field: any, value: any) => void;
        defaultDate?: string | null;
        hideLabel?: boolean;
    };

    const DATE_FORMAT = 'MM/dd/yyyy - HH:mm';

    const { updateField, defaultDate, hideLabel }: Props = $props();

    const parsedDate = defaultDate ? parse(defaultDate as string, DATE_FORMAT, new Date()) : new Date()
    
    let startDate: Date = $state(parsedDate);
    let dateFormat: string = $state(DATE_FORMAT);
    let isOpen: boolean = $state(false);

    const toggleDatePicker = () => (isOpen = !isOpen);

    const formatDate = (dateString: Date) => {
        return (dateString && format(new Date(dateString), dateFormat)) || "";
    };

    let formattedStartDate = $derived(formatDate(startDate));

    $effect(() => {
        updateField("expireDate", formattedStartDate);
    });
</script>

<div>
    {#if !hideLabel}
        <h6
            class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
        >
            Expiration date
        </h6>
    {/if}

    <DatePicker
        bind:isOpen
        bind:startDate
        enablePastDates={false}
        showTimePicker
        enableFutureDates
    >
        <input
            type="text"
            placeholder="Select date"
            value={formattedStartDate}
            onclick={toggleDatePicker}
            name="expireDate"
            readonly
            class="!outline-none cursor-pointer"
        />
    </DatePicker>
</div>
