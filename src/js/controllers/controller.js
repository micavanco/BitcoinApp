import SinglePeakController from "./singlePeakController";
import periods from '../../assets/periods';
import Dataset from "../models/dataset";
import Chart from "../models/chart";

export default class Controller {
    constructor(BitcoinView){
        this._bitcoinView = new BitcoinView;
        this._mainContainer = null;
        this._currencies = [];
        this._chartData = null;
    }

    _setListeners() {
        document.getElementById('add-btn').addEventListener('click', () => {
            const input = document.querySelector('.search-input');
            const input2 = document.querySelector('.search-input-currency');
            const input3 = document.querySelector('.search-input-period');
            const slider = document.querySelector('.slider');
            if(input.value && input2.value && input3.value)
            {
                this._getCryptoCurrencyRating(input.value, input2.value, input3.value, slider.value);
                let data = [];
                let labels = [];
                this._chartData.forEach(e => {
                    data.push(e.time_period_end);
                    labels.push(e.price_close);
                });
                let dataset = new Dataset(input.value, data, 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 0.2)');
                let chart = new Chart('line', labels, dataset, input.value+'-'+input2.value);
                this._mainContainer.append(this._bitcoinView._createBox(input.value, input2.value,chart));
            }
        });
    }

    _getCryptoCurrencyRating(cryptoCurrency, currency, period, limit) {
        fetch("https://rest.coinapi.io/v1/ohlcv/" +
            `${cryptoCurrency}/${currency}/` +
            `latest?period_id=${period}&limit=${limit}`, {
            "method": "GET",
            "headers": {
                "X-CoinAPI-Key": "CA9D596A-6E22-4752-AB14-78A0374BEC96"
            }
        })
            .then(res => res.json())
            .then(data => this._chartData = data);
    }

    _getSinglePeak(currency, digitalCurrency) {
        const singlePeakController = new SinglePeakController(currency, digitalCurrency);
        const data = singlePeakController.model.getPeak();
        data.then(x => this._date = x.utc_date);

    }

    _getDigitalCurrencies() {
        fetch("", {
            "method": "GET",
            "headers": {
                "X-CoinAPI-Key": "CA9D596A-6E22-4752-AB14-78A0374BEC96"
            }
        })
            .then(response => response.json())
            .then(data => {
                this._currencies = data;
                const dataList = document.getElementById('search-output');
                const dataList2 = document.getElementById('search-output-currency');
                let listOptionsCrypto = '';
                let listOptionsNonCrypto = '';
                this._currencies.forEach(e => {
                    if(e.type_is_crypto)
                        listOptionsCrypto += `<option value="${e.asset_id}">`;
                    else
                        listOptionsNonCrypto += `<option value="${e.asset_id}">`;
                });
                dataList.innerHTML = listOptionsCrypto;
                dataList2.innerHTML = listOptionsNonCrypto;
            })
            .catch(err => {
                console.log(err);
            });
    }

    _setAvailablePeriods() {
        const dataList = document.getElementById('search-output-period');
        let listOptions = '';
        periods.forEach(e => listOptions += `<option value="${e.display_name}">`);
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
        this._setAvailablePeriods();
        this._getSinglePeak('pln', 'btc');
        this._setListeners();
        this._createWidget();
        this._generateChart();
    }
}
