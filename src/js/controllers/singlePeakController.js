import SinglePeak from "../models/singlePeak"

class SinglePeakController {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.model = new SinglePeak(this.currency, this.coin);
    }
}

export default SinglePeakController;
