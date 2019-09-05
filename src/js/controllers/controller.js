import Bitcoin from "../models/bitcoin";
import SinglePeakController from "./singlePeakController";
import CryptoPricesController from "./cryptoPricesController";
import Chart from 'chart.js';

export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
        this._digital_currencies = [];
        this._currencies = [];
        this._date ;
    }

    _setListeners() {
        document.getElementById('add-btn').addEventListener('click', () => {
            const input = document.querySelector('.search-input');
            const input2 = document.querySelector('.search-input-currency'); 
            if(input.value)
            {
                const selectedBitcoin = new Bitcoin(input.value, null, null, null, input2.value);
                this._mainContainer.append(this._bitcoinView._createBox(selectedBitcoin,1,));
            }
        });
    }

    _getBitcoinRating(type, period) {

    }

    _getSinglePeak(currency, digitalCurrency) {
        const singlePeakController = new SinglePeakController(currency, digitalCurrency);
        const data = singlePeakController.model.getPeak();
        data.then(x => this._date = x.utc_date);
        
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

    _getCurrencies() {
        const cryptoPricesController = new CryptoPricesController('pln', 'btc');
        const data = cryptoPricesController.model.getPrices();
        data.then(x => {
                x.prices.forEach(e => this._currencies.push(Object.values(e)[0]));
                const dataList = document.getElementById('search-output-currency');
                let listOptions = '';
                this._currencies.forEach(e => listOptions += `<option value="${e}">`);
                dataList.innerHTML = listOptions;
            })
            .catch(err => {
                console.log(err);
            });
    }

    _generateChart(){
        const data = {
            labels: [
                "15:00","16:00","17:00","18:00","19:00","20:00"
            ],
            datasets: [
                {
                    label: "BTC",
                    data: [
                        10,2,4,1,6,5
                    ],
                    fill: false,
                    borderColor: "lightblue",
                    backgroundColor: "darkblue",
                    lineTension: 0.1
                }
            ]
        }
        const config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'test'
            }
            }
          }
          const ctx = document.getElementById('myChart').getContext('2d');
          const newChart = new Chart(ctx, config);
          this._updateConfigChart(newChart);
    }

    _updateConfigChart(chart) {
        chart.options.title.text = 'BTC-PLN';
        chart.update();
    }

    _addDataToChart(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    init() {
        console.log('Inicjalizacja controllera...');

        this._mainContainer = this._bitcoinView.init();
        this._getDigitalCurrencies();
        this._getCurrencies();
        this._getSinglePeak('pln', 'btc');
        this._setListeners();
        this._generateChart();
    }
}
