import CryptoPrices from "../models/cryptoPrices"

class CryptoPricesController {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
        this.model = new CryptoPrices(currency, coin);
    }
}

export default CryptoPricesController;
