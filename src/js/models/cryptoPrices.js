import api from "./apiData"


class CryptoPrices {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.name = 'priceList';
    }

    getPrices() {
        const _api = new api(this.currency, this.coin)
        _api.getData(this.name);
    }
}

export default CryptoPrices;