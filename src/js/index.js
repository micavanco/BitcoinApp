import './../css/stylesheet.css';
import SinglePeakController from "./controllers/singlePeakController";
import CryptoPricesController from "./controllers/cryptoPricesController";


const singlePeakController = new SinglePeakController('pln', 'btc');
const cryptoPricesController = new CryptoPricesController('usd', 'btc')
singlePeakController.model.getPeak();
cryptoPricesController.model.getPrices();
