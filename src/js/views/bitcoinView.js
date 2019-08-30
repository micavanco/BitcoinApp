
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
