export const createRequest = async(options:{
    url: string,
    sendMethod: string,
    id?: number,
    data?: any,
    callback: (data: any[]) => void
}) => {

    let strRequest = `${options.url}`;
    if (options.id) {
        strRequest += `${options.id}`;
    }

    if (options.sendMethod === 'GET') {
        fetch(strRequest)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                options.callback(data);
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
                alert(error);
            })
    }
    else if (options.sendMethod === 'POST') {
        fetch(strRequest, {
            method: 'POST',
            body: JSON.stringify(options.data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response: any) => {
                console.log(response);
                if (response.ok === true) {
                    options.callback(response);
                }
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
                alert(error);
            })
    }
}
