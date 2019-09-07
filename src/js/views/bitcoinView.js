export default class BitcoinView {

    _createContainer() {
        const container = document.createElement("div");
        container.classList.add('main-container');
        document.querySelector('.container').append(container);
        return container;
    }

    _createBox(bitcoin, chart) {
        const box = document.createElement("div");
        box.classList.add('bitcoin-box');
        box.innerHTML = `<h1>${bitcoin.type}</h1>`;
        box.innerHTML += `<h2>${bitcoin.currency}</h2>`;

        const removeButton = document.createElement('div');
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => box.remove());

        const chartBox = document.createElement("canvas");
        chartBox.setAttribute("id", "myChart");
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


    _createChart(chart) {

    }

    _createBitcoin(bitcoin) {

    }

    init() {
        return this._createContainer();
    }
}
