import Chart from 'chart.js';

export default class BitcoinView {

    _createContainer() {
        const container = document.createElement("div");
        container.classList.add('main-container');
        document.querySelector('.container').append(container);
        return container;
    }

    _createBox(currencyYAxisLabel, cryptoCurrency, currency, chart) {
        const box = document.createElement("div");
        box.classList.add('bitcoin-box');
        box.innerHTML = `<h1>${cryptoCurrency}</h1>`;
        box.innerHTML += `<h2>${currency}</h2>`;

        const removeButton = document.createElement('div');
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => box.remove());

        const chartBox = document.createElement("canvas");
        this._generateChart(currencyYAxisLabel, chartBox, chart);
        box.append(chartBox);

        const bar1 = document.createElement("div");
        const bar2 = document.createElement("div");
        bar1.classList.add('bar1');
        bar2.classList.add('bar2');
        bar1.addEventListener('click', () => box.remove());
        bar2.addEventListener('click', () => box.remove());
        removeButton.append(bar1);
        removeButton.append(bar2);
        box.append(removeButton);

        return box;
    }

    _generateChart(currencyYAxisLabel, chartElement, chart){
        const data = {
            labels: chart.labels,
            datasets: [
                {
                    label: chart.datasets.label,
                    data: chart.datasets.chartData,
                    fill: false,
                    borderColor: chart.datasets.borderColor,
                    backgroundColor: chart.datasets.backgroundColor,
                    lineTension: 0.1
                }
            ]
        };
        const config = {
            type: chart.type,
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        stacked: false,
                        scaleLabel: {
                            display: true,
                            labelString: currencyYAxisLabel
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: chart.title
                }
            }
        };
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, config);
    }

    _createPriceColumn(bitcoin) {
        const price = document.createElement('td');
        price.style.color = "green";
        price.innerHTML = `<span>${bitcoin}<span style="color: red;">PLN</span></span>`;
        document.querySelector('.widget-row').append(price);

        return price;
    }

    _createNameColumn(bitcoin) {
        const name = document.createElement('td');
        name.innerHTML = `<span>${bitcoin}:</span>`;
        document.querySelector('.widget-row').append(name);

        return name;
    }

    init() {
        return this._createContainer();
    }
}
