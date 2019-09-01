import api from "./apiData"

// klasa wywołująca pobieranie pojedyńczego peaka 
class SinglePeak {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.name = 'singlePeak';
    }

    getPeak() {
        const _api = new api(this.currency, this.coin)
        return _api.getData(this.name);
    }
}

export default SinglePeak;