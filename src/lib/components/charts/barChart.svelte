<script lang="ts">
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";
    import { todoStatusEnums } from "$lib/enums/todoEnums";
    import { parse } from "date-fns";
    import { DATE_FORMAT } from "$lib/constants/dateFormat";

    type Props = {
        data: TTodoResponse[];
    };

    const { data }: Props = $props();

    let chart;
    let canvasRef: HTMLCanvasElement;

    const detectExpired = (expireDate: string): boolean => {
        return (
            parse(expireDate as string, DATE_FORMAT, new Date()).getTime() <
            new Date().getTime()
        );
    };

    const calculateAmount = (
        st: number,
        calculateExpired?: boolean,
    ): number => {
        const calculated = calculateExpired
            ? data.filter(({ expireDate }) => {
                  const isExpired = detectExpired(expireDate);
                  if (isExpired) return isExpired;
              })
            : data.filter(({ status, expireDate }) => {
                  const isExpired = detectExpired(expireDate);

                  return !isExpired && status === st;
              });

        return calculated.length;
    };

    onMount(() => {
        if (data) {
            const ctx = canvasRef.getContext("2d");

            const finishedTasks = calculateAmount(todoStatusEnums.completed);
            const ongoingTasks = calculateAmount(todoStatusEnums.ongoing);
            const expiredTasks = calculateAmount(todoStatusEnums.ongoing, true);

            const chartData = {
                labels: ["Finished", "Ongoing", "Expired"],
                datasets: [
                    {
                        data: [finishedTasks, ongoingTasks, expiredTasks],
                        backgroundColor: ["#c8e6c9", "#fff9c4", "#ffe6e8"],
                    },
                ],
            };

            if (ctx) {
                chart = new Chart(ctx, {
                    type: "bar",
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                                suggestedMin: 0,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: "Todo status",
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
                                display: false,
                            },
                            tooltip: {
                                enabled: false,
                            },
                        },
                    },
                });
            }
        }
    });
</script>

<canvas bind:this={canvasRef}></canvas>
