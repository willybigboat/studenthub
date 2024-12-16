/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncGet(api: string): Promise<any> {
    try {
        const res: Response = await fetch(api)
        try {
            return await res.json()
        } catch (error) {
            return error
        }
    } catch (error) {
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData) {
    try {
        const res: Response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body),
            mode: "cors"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Post request error:", error);
        throw error;
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers: new Headers({
            'Access-Control-Allow-Origin': "http://localhost:7000/",
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: "cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//asyncPost


//asyncDelete
export async function asyncDelete(api: string) {
    try {
        const res: Response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: "cors"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Delete request error:", error);
        throw error; // 將錯誤往上拋出
    }
}
//asyncPut
export async function asyncPut(api: string, body: {} | FormData) {
    try {
        const res: Response = await fetch(api, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            mode: "cors"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Put request error:", error);
        throw error;
    }
}