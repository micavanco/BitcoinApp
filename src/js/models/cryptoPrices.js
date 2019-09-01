import api from "./apiData"

// klasa wywołująca pobranie kursu kryptowaluty we wszystkich walutach 
class CryptoPrices {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.name = 'priceList';
    }

    getPrices() {
        const _api = new api(this.currency, this.coin)
        return _api.getData(this.name);
    }
}

export default CryptoPrices;