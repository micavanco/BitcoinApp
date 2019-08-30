
export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
    }

    _setListeners() {
        document.querySelector('input').addEventListener('click', () => {
            this._mainContainer.append(this._bitcoinView._createBox(1,1,));
        });
    }

    _getBitcoinRating(type, period) {

    }

    init() {
        console.log('Inicjalizacja controllera...');

        this._mainContainer = this._bitcoinView.init();
        this._setListeners();
    }
}
