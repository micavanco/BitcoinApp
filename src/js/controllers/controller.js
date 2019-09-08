import SinglePeakController from "./singlePeakController";
import Dataset from "../models/dataset";
import Chart from "../models/chart";
import intervals from '../../assets/intervals';

const API_KEY = "FBAB778D-50F0-41EE-8774-1D71D5D21D1C";

export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
        this._cryptoCurrencies = [];
        this._currencies = null;
        this._chartData = null;
        document.getElementById("end").value = new Date().toISOString().slice(0,16);
        document.getElementById("end").max = new Date().toISOString().slice(0,16);
    }

    _setListeners() {
        document.getElementById('add-btn').addEventListener('click', async () => {
            const input = document.querySelector('.search-input');
            const input2 = document.querySelector('.search-input-currency');
            const input3 = document.querySelector('.search-input-interval');
            let errorMsg = document.getElementById('generate-error');
            if(input.value && input2.value && input3.value)
            {
                let dateStart = null;
                if(document.getElementById("period-checkbox").checked === true)
                    dateStart = new Date(document.getElementById("end").value) - 86400000;
                else
                    dateStart = new Date(document.getElementById("start").value).getTime();
                const dateEnd = new Date(document.getElementById("end").value).getTime();
                const ratings = await this._getCryptoCurrencyRating(input.value, input2.value, input3.value, dateStart, dateEnd);
                this._chartData = await ratings.json();
                if(this._chartData.error)
                {
                    errorMsg.innerText = this._chartData.error;
                    errorMsg.style.display = 'block';
                }
                else
                {
                    errorMsg.style.display = 'none';
                    let currencyMultiplier = 1;
                    if(input2.value !== 'USD')
                    {
                        let currency = await this._convertCurrency();
                        currency = await currency.json();
                        Object.keys(currency.rates).forEach(e => {
                            if(e === input2.value)
                                currencyMultiplier = currency.rates[e];
                        });
                    }
                    this._createNewChartBox(input.value, input2.value, currencyMultiplier);
                }
            }

        });
    }

    _createNewChartBox(cryptoCurrency, currency, currencyMultiplier) {
        let data = [];
        let labels = [];
        const isChecked = document.getElementById("period-checkbox").checked;
        this._chartData.data.forEach(e => {
            data.push(parseFloat(e.priceUsd)*currencyMultiplier);
            if(isChecked)
                labels.push(new Date(e.time).toString().split(' ')[4]);
            else
                labels.push(e.date.substring(0, 10));
        });
        let dotsColor = document.getElementById('chart-dots').value;
        let lineColor = document.getElementById('chart-line').value;

        let dataset = new Dataset(cryptoCurrency, data, lineColor, dotsColor);
        let chart = new Chart('line', labels, dataset, cryptoCurrency+'-'+currency);
        this._mainContainer.append(this._bitcoinView._createBox(currency, this._getKeyByValueCrypto(cryptoCurrency).toUpperCase(), this._currencies[currency], chart));
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
        this._cryptoCurrencies.forEach(e => {if(e.symbol === value)id = e.id;});
        return id;
    }


    _convertCurrency() {
        return fetch(`https://api.exchangeratesapi.io/latest?base=USD`, {
            "method": "GET"
        });
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
                this._cryptoCurrencies = data.data;
                const dataList = document.getElementById('search-output');
                let listOptionsCrypto = '';
                this._cryptoCurrencies.forEach(e => {
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
                this._currencies = data.currencies;
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
