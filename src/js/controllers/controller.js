import SinglePeakController from "./singlePeakController";
import Dataset from "../models/dataset";
import Chart from "../models/chart";
import intervals from '../../assets/intervals';

const API_KEY = "FBAB778D-50F0-41EE-8774-1D71D5D21D1C";

export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
        this._currencies = [];
        this._chartData = null;
    }

    _setListeners() {
        document.getElementById('add-btn').addEventListener('click', async () => {
            const input = document.querySelector('.search-input');
            const input2 = document.querySelector('.search-input-currency');
            const input3 = document.querySelector('.search-input-interval');
            const slider = document.querySelector('.slider');
            if(input.value && input2.value && input3.value)
            {
                const dateStart = new Date(document.getElementById("start").value);
                const dateEnd = new Date(document.getElementById("end").value);
                const ratings = await this._getCryptoCurrencyRating(input.value, input2.value, input3.value, dateStart.getTime(), dateEnd.getTime());
                this._chartData = await ratings.json();
                this._createNewChartBox(input.value, input2.value);
            }

        });
    }

    _createNewChartBox(cryptoCurrency, currency) {
        let data = [];
        let labels = [];
        this._chartData.data.forEach(e => {
            data.push(parseFloat(e.priceUsd));
            labels.push(e.date.substring(0, 10));
        });
        let dataset = new Dataset(cryptoCurrency, data, 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 0.2)');
        let chart = new Chart('line', labels, dataset, cryptoCurrency+'-'+currency);
        this._mainContainer.append(this._bitcoinView._createBox(this._getKeyByValueCrypto(cryptoCurrency), currency, chart));
    }

    _getCryptoCurrencyRating(cryptoCurrency, currency, interval, start, end) {
        return fetch(`https://api.coincap.io/v2/assets/${this._getKeyByValueCrypto(cryptoCurrency)}/history` +
        `?interval=${this._getKeyByValueIntervals(interval)}&start=${start}&end=${end}`, {
            "method": "GET"
        });
    }

    _getKeyByValueIntervals(value) {
        let id = null;
        intervals.forEach(e => {if(e.name === value)id = e.id;});
        return id;
    }

    _getKeyByValueCrypto(value) {
        let id = null;
        this._currencies.forEach(e => {if(e.symbol === value)id = e.id;});
        return id;
    }


    _convertCurrency() {

    }

    _getSinglePeak(currency, digitalCurrency) {
        const singlePeakController = new SinglePeakController(currency, digitalCurrency);
        const data = singlePeakController.model.getPeak();
        data.then(x => this._date = x.utc_date);

    }

    _getDigitalCurrencies() {
        fetch("https://api.coincap.io/v2/assets", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(data => {
                this._currencies = data.data;
                const dataList = document.getElementById('search-output');
                let listOptionsCrypto = '';
                this._currencies.forEach(e => {
                    listOptionsCrypto += `<option value="${e.symbol}">`;
                });
                dataList.innerHTML = listOptionsCrypto;
            })
            .catch(err => {
                console.log(err);
            });
    }

    _getCurrencies() {
        fetch("https://currency-converter5.p.rapidapi.com/currency/list?format=json", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                "x-rapidapi-key": "4f51d720camsh44ba5e07fbba621p10dc0fjsn3426629f4708"
            }
        })
            .then(response => response.json())
            .then(data => {
                const dataList = document.getElementById('search-output-currency');
                let listOptions = '';
                Object.keys(data.currencies).forEach(e => {
                    listOptions += `<option value="${e}">`;
                });
                dataList.innerHTML = listOptions;
            })
            .catch(err => {
                console.log(err);
            });
    }

    _setAvailableIntervals() {
        const dataList = document.getElementById('search-output-interval');
        let listOptions = '';
        intervals.forEach(e => listOptions += `<option value="${e.name}">`);
        dataList.innerHTML = listOptions;
    }

    _createWidget() {
        const bitcoin = ['BTC', 'XRP', 'ETH', 'LTC', 'BCH', 'BNB', 'EOS', 'XMR', 'ADA', 'XLM'];

        for (let i = 0; i < bitcoin.length; i++) {
            const singlePeakController = new SinglePeakController('pln', bitcoin[i]);
            const data = singlePeakController.model.getPeak();
            data.then(x => {
                this._bitcoinView._createNameColumn(bitcoin[i]);
                this._bitcoinView._createPriceColumn(Math.round(x.last_price * 100) / 100);
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    init() {
        console.log('Inicjalizacja controllera...');

        this._mainContainer = this._bitcoinView.init();
        this._getDigitalCurrencies();
        this._getCurrencies();
        this._setAvailableIntervals();
        this._getSinglePeak('pln', 'btc');
        this._setListeners();
        this._createWidget();
    }
}
