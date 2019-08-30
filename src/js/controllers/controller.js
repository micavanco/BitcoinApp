
export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
    }

    _setListeners() {

    }

    _getBitcoinRating(type, period) {

    }

    init() {
        console.log('Inicjalizacja controllera...');

        this._mainContainer = this._bitcoinView.init();
        this._setListeners();
    }
}
