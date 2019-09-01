import Controller from "./controllers/controller";
import bitcoinView from "./views/bitcoinView";

export default class App {
    constructor() {
        this._controller = new Controller(bitcoinView);
    }

    init() {
        this._controller.init();
    }
}
