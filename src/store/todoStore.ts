
import { writable, type Writable } from "svelte/store";
import { httpRequest, type ApiResponse } from "../utils/httpRequest";
import { todosEndpoint } from "$lib/constants/endpoints";

interface TodoState {
    data: TTodoResponse[];
    error: string;
    loading: boolean;
    todosAreEmpty: boolean;
}

interface TodoStore extends Writable<TodoState> {
    getTodo: (additionalParams?: string) => Promise<void>;
}

const createTodoStore = (): TodoStore => {
    const store: Writable<TodoState> = writable({
        data: [],
        error: "",
        loading: false,
        todosAreEmpty: false,
    });

    const getTodo = async (additionalParams?: string): Promise<void> => {
        try {
            store.update((prevState: TodoState) => {
                return {
                    ...prevState,
                    loading: true,
                };
            });

            const response: ApiResponse<TTodoResponse[]> = await httpRequest("GET", `${todosEndpoint}?_sort=priority${additionalParams ? '&' + additionalParams : ''}`);
            store.set({
                loading: false,
                error: response.error ? response.error : "",
                data: response.data || [],
                todosAreEmpty: !(
                    response.data && response.data.length > 0
                ),
            });
        } catch (error) {
            store.update((prevState: TodoState) => {
                return {
                    ...prevState,
                    loading: false,
                    error: "Error occurred",
                };
            });
        }
    };

    return {
        ...store,
        getTodo,
    };
};

export const todoStore: TodoStore = createTodoStore();

