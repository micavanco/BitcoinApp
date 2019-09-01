import api from "./apiData"


class SinglePeak {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.name = 'singlePeak';
    }

    getPeak() {
        const _api = new api(this.currency, this.coin)
        _api.getData(this.name);
    }
}

export default SinglePeak;