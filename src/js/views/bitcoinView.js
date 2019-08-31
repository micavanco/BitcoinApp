
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
        const removeButton = document.createElement('div');
        removeButton.classList.add('remove-btn');
        removeButton.innerHTML = '<div class="bar1"></div><div class="bar2"></div>';
        box.append(removeButton);
        return box;
    }

    _createChart(chart) {

    }

    _createBitcoin(bitcoin) {

    }

    init() {
        return this._createContainer();
    }
}
