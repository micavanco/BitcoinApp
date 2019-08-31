import Bitcoin from "../models/bitcoin";

export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
        this._digital_currencies = [];
    }

    _setListeners() {
        document.getElementById('add-btn').addEventListener('click', () => {
            const input = document.querySelector('.search-input');
            if(input.value)
            {
                const selectedBitcoin = new Bitcoin(input.value);
                this._mainContainer.append(this._bitcoinView._createBox(selectedBitcoin,1,));
            }
        });
    }

    _getBitcoinRating(type, period) {

    }

    _getDigitalCurrencies() {
        fetch("https://bravenewcoin-v1.p.rapidapi.com/digital-currency-symbols", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
                "x-rapidapi-key": "4f51d720camsh44ba5e07fbba621p10dc0fjsn3426629f4708"
            }
        })
            .then(response => response.json())
            .then(data => {
                data.digital_currencies.forEach(e => this._digital_currencies.push(Object.values(e)[0]));
                const dataList = document.getElementById('search-output');
                let listOptions = '';
                this._digital_currencies.forEach(e => listOptions += `<option value="${e}">`);
                dataList.innerHTML = listOptions;
            })
            .catch(err => {
                console.log(err);
            });
    }

    init() {
        console.log('Inicjalizacja controllera...');

        this._mainContainer = this._bitcoinView.init();
        this._getDigitalCurrencies();
        this._setListeners();
    }
}
