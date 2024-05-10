/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        container: {
            center: true,
        },
        extend: {}
    },
    plugins: []
})