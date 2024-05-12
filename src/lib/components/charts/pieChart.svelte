<script lang="ts">
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";
    import { todoPriorityEnums } from "$lib/enums/todoEnums";

    type Props = {
        data: TTodoResponse[];
    };

    const { data }: Props = $props();

    let chart;
    let canvasRef: HTMLCanvasElement;

    const calculatePriority = (pr: number): number => {
        const calculated = data.filter(({ priority }) => {
            return priority === pr;
        });

        return calculated?.length;
    };

    onMount(() => {
        if (data) {
            const ctx = canvasRef.getContext("2d");

            const lowPriority = calculatePriority(todoPriorityEnums.low);
            const mediumPriority = calculatePriority(todoPriorityEnums.medium);
            const highPriority = calculatePriority(todoPriorityEnums.high);

            const data = {
                labels: ["Low", "Medium", "High"],
                datasets: [
                    {
                        data: [lowPriority, mediumPriority, highPriority],
                        backgroundColor: ["#ffe6e8", "#fff9c4", "#c8e6c9"],
                    },
                ],
            };

            if (ctx) {
                chart = new Chart(ctx, {
                    type: "pie",
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "Todo priority",
                                font: function (context) {
                                    var width = context.chart.width;
                                    var size = Math.round(width / 30);

                                    return {
                                        weight: "bold",
                                        size: size,
                                    };
                                },
                            },
                            legend: {
                                title: {
                                    display: true,
                                },
                            },
                        },
                    },
                });
            }
        }
    });
</script>

<canvas bind:this={canvasRef}></canvas>
