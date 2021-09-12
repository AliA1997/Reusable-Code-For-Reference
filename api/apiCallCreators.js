import * as config from '../constants/index';

export function get(path) {
    return new Promise((resolve, reject) => {
        return fetch(
            new  Request(
                `${config.server}${path}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    // mode: 'same-origin',
                    // headers: {
                    //     'Authorization': 'Bearer access token',
                    //     'Content-Type': 'application/json'
                    // },
                    // credentials: 'same-origin',
                    // cache: 'reload',
                    // bodyUsed: false
                    type: 'application/json'
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case 200:
                    resolve(response.json());
                    break;
                case 201:
                    resolve(response.json());
                    break;
                case 202:
                    // response.message = "Batch processed successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 203:
                    // response.message = "Backed up successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 204:
                    // response.message = 'No content returned, response successful.';
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.text());
                    break;
                case 304:
                    // response.message = "Request successful, WARNING: Data not motified.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 305:
                    // response.message = "Proxy Error.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 400:
                    // response.message = "Bad Request.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 401:
                    // response.message = "Unauthorized ";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 404:
                    // response.message = "Not found";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 415:
                    // response.message = "Something wrong with body of response";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                default:
                    // response.message = "Server error."
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
            }
        })
        .catch(function(error) {
            reject(error);
        });
    })
    .then(response => response.result)
    .catch(function(error) {
        console.log("Get Promise Error:", error);
    })
}

export function post(path, body, type) {
    return new Promise((resolve, reject) => {
        return fetch(
            new Request(
                // `${config.server}/${path}`,
                `${config.server}${path}`,
                {
                    // credentials: 'include',
                    method: "POST",
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    // body: JSON.stringify({name: 'name', fuck: 'fuck'})
                    // method: 'POST',
                    // credentials: 'include',
                    // headers: {
                    //     'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
                    // },
                    // mode: 'cors',
                    // cache: 'reload',
                    bodyUsed: true,
                    body: JSON.stringify(body),
                    type: type ? type : 'application/json'
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case 200:
                    resolve(response.json());
                    break;
                case 201:
                    resolve(response.json());
                    break;
                case 202:
                    // response.message = "Batch processed successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 203:
                    // response.message = "Backed up successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 204:
                    // response.message = 'No content returned, response successful.';
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.text());
                    break;
                case 304:
                    // response.message = "Request successful, WARNING: Data not motified.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 305:
                    // response.message = "Proxy Error.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 400:
                    // response.message = "Bad Request.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 401:
                    // response.message = "Unauthorized ";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 404:
                    // response.message = "Not found";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 415:
                    // response.message = "Something wrong with body of response";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                default:
                    // response.message = "Server error."
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
            }
            // const res = config.determineStatusMessage(response);
            // if(res.resolved && res.isJsonResponse)
            //     return res.json()
            //         .then(data => {
            //             console.log("DATA:", data);
            //             return data;
            //         });
            // else if(res.resolved && !res.isJsonResponse)
            //     return res.text();
            // else
            //     return reject(res);
        })
        .catch(function(error) {
            return reject(error);
        });
    })
    .then(result => result)
    .catch(function(err){
        console.log("Error:", err);
    });
}

export function put(path, body) {
    return new Promise((resolve, reject) => {
        return fetch(
            new  Request(
                `${config.server}/${path}`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        credentials: 'same-origin',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    
                    // cache: 'reload',
                    body: JSON.stringify(body),
                    bodyUsed: true
                }
            )
        )
        .then(function(response) {
            const res = config.determineStatusMessage(response);
            if(res.resolved)
                return resolve(res.json());
            else    
                return reject(res);
        })
        .catch(function(error) {
            return reject(error);
        })
    });
}

export function patch(path, body, type) {
    return new Promise((resolve, reject) => {
        return fetch(
            new  Request(
                `${config.server}${path}`,
                {
                    credentials: 'include',
                    method: "PATCH",
                    headers: {
                        // 'Authorization': 'Bearer Token FUCK FUCK FUCK YOU',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(body),
                    type: type ? type : 'application/json'
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case 200:
                    // response.message = "Data retrieved successfully.";
                    break;
                case 201:
                    // response.message = "Data created successfully.";
                    resolve(response.json());
                    break;
                case 202:
                    // response.message = "Batch processed successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 203:
                    // response.message = "Backed up successfully.";
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 204:
                    // response.message = 'No content returned, response successful.';
                    // response.resolved = true;
                    // response.isJsonResponse = false;
                    resolve(response.text());
                    break;
                case 304:
                    // response.message = "Request successful, WARNING: Data not motified.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    resolve(response.json());
                    break;
                case 305:
                    // response.message = "Proxy Error.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 400:
                    // response.message = "Bad Request.";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 401:
                    // response.message = "Unauthorized ";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 404:
                    // response.message = "Not found";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                case 415:
                    // response.message = "Something wrong with body of response";
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
                default:
                    // response.message = "Server error."
                    // response.resolved = false;
                    // response.isJsonResponse = false;
                    reject(response.text());
                    break;
            }
        })
        .catch(function(error) {
            return reject(error);
        });
    });
}

export function deleteCall(path, bodyId) {
    return new Promise((resolve, reject) => {
        return fetch(
            new  Request(
                `${config.server}${path}/${bodyId}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'same-origin',
                    cache: 'reload',
                    bodyUsed: false
                }
            )
        )
            .then(function(response) {
                switch(response.status) {
                    case 200:
                        // response.message = "Data retrieved successfully.";
                        break;
                    case 201:
                        // response.message = "Data created successfully.";
                        resolve(response.json());
                        break;
                    case 202:
                        // response.message = "Batch processed successfully.";
                        // response.resolved = true;
                        // response.isJsonResponse = false;
                        resolve(response.json());
                        break;
                    case 203:
                        // response.message = "Backed up successfully.";
                        // response.resolved = true;
                        // response.isJsonResponse = false;
                        resolve(response.json());
                        break;
                    case 204:
                        // response.message = 'No content returned, response successful.';
                        // response.resolved = true;
                        // response.isJsonResponse = false;
                        resolve(response.text());
                        break;
                    case 304:
                        // response.message = "Request successful, WARNING: Data not motified.";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        resolve(response.json());
                        break;
                    case 305:
                        // response.message = "Proxy Error.";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                    case 400:
                        // response.message = "Bad Request.";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                    case 401:
                        // response.message = "Unauthorized ";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                    case 404:
                        // response.message = "Not found";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                    case 415:
                        // response.message = "Something wrong with body of response";
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                    default:
                        // response.message = "Server error."
                        // response.resolved = false;
                        // response.isJsonResponse = false;
                        reject(response.text());
                        break;
                }
            })
            .catch(function(error) {
                return reject(error);
            });
    });
}