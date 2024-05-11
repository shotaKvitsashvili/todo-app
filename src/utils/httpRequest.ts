// api.ts
import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios';
import { PUBLIC_API_BASEURL } from '$env/static/public';

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

const baseUrl = PUBLIC_API_BASEURL

export async function httpRequest<T>(
    method: Method,
    url: string,
    data?: Record<string, any>
): Promise<ApiResponse<T>> {
    let response: AxiosResponse<T>;
    let error: string | undefined;

    const conf: AxiosRequestConfig = {
        method,
        url: PUBLIC_API_BASEURL + url
    }

    if (data) conf.data = data

    try {
        response = await axios.request<T>(conf);

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
