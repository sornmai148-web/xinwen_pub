import { sendHeaderGenerate } from "../lib/helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Options {
  method?: HttpMethod;
  body?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  isFormData?: boolean;
}

/**
 * Note : Nextjs by default server fetching
 * Used for server fetching data
 */
export async function fetchApi<T = any>(
  path: string,
  options: Options = {}
): Promise<T | null> {
  try {
    const basePath = process.env.NEXT_PUBLIC_API_URL;
    const headers = sendHeaderGenerate(options?.body as any);

    const response = await fetch(`${basePath}${path}`, {
      method: options.method || "POST",
      body: JSON.stringify(options?.body as any),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
        ...headers,
      },
    });

    if (!response.ok) throw new Error("出现错误.");

    return await response.json();
  } catch (error) {
    if (error instanceof Error) console.log(`请求失败 : ${error.message}`);
    return null;
  }
}

/**
 * Used for client fetching data
 */
export async function fetchClientApi<T = any>(
  path: string,
  options: Options = {}
): Promise<T | null> {
  try {
    const basePath = process.env.NEXT_PUBLIC_API_URL;
    const headers = sendHeaderGenerate(options?.body as any);

    const response = await fetch(`${basePath}${path}`, {
      method: options.method || "POST",
      body: JSON.stringify(options?.body as any),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
        ...headers,
      },
      next: { revalidate: 30 }, // cache for 3 seconds
    });

    if (!response.ok) throw new Error("出现错误.");

    return await response.json();
  } catch (error) {
    if (error instanceof Error) console.log(`请求失败 : ${error.message}`);
    return null;
  }
}
