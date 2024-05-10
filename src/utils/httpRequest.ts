// api.ts
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export async function httpRequest<T>(
    config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    let response: AxiosResponse<T>;
    let error: string | undefined;

    try {
        response = await axios.request<T>(config);

        return {
            data: response.data,
        };
    } catch (err: any) {
        if (err.response) {
            error = err.response.data.message || 'An error occurred';
        } else {
            error = err.message || 'An error occurred';
        }

        return {
            data: null!,
            error: error,
        };
    }
}
