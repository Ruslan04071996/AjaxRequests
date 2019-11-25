export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    getJSON(path, onSuccess, onFail) {
        this.makeRequest(path, 'GET', [], null, onSuccess, onFail);
    }
    postJSON(path, data, onSuccess, onFail) {

        xhr.makeRequest(path, 'POST', [
            { name: 'Content-Type', value: 'application/json' }
        ], JSON.stringify(data), onSuccess, onFail);
    }

    makeRequest(path, method, headers = [], body = null, onSuccess, onFail) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${this.baseUrl}${path}`);
        for (const header of headers) {
            xhr.setRequestHeader(header.name, header.value);
        }

        xhr.addEventListener('load', ev => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                if (onSuccess !== undefined) {
                    onSuccess(data);
                }
                return;
            }

            if (onFail !== undefined) {
                onFail(xhr.statusText)
            }


        });

        xhr.addEventListener('error', ev => {
            if (onFail !== undefined) {
                onFail('Unexpected error');
            }
        });
        xhr.send(body);
    }
}