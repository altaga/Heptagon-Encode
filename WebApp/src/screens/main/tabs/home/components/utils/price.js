import axios from 'axios';

export const getPriceAvax = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/request',
            headers: {
                'chain': 'avax'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.usd.price);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceBSC = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/request',
            headers: {
                'chain': 'bsc'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceFantom = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/request',
            headers: {
                'chain': 'fantom'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceRopsten = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/request',
            headers: {
                'chain': 'eth'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPricePolygon = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/request',
            headers: {
                'chain': 'polygon'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.maticusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}