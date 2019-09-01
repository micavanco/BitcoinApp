import './../css/stylesheet.css';
import SinglePeakController from "./controllers/singlePeakController";
import CryptoPricesController from "./controllers/cryptoPricesController";

const listOfPeaks = [];

const singlePeakController = new SinglePeakController('pln', 'btc');
const cryptoPricesController = new CryptoPricesController('usd', 'btc')
const data = singlePeakController.model.getPeak();

// wrzuca do tablicy cene i date (trzeba bedzie zrobic moze zeby to się wykonywało co 5 minut i zebrac dane do wykresu bo no co 5 minut jest odswierzanie api)
data.then(function (value) {
    listOfPeaks.push([value.last_price, value.utc_date]);
})
console.log(listOfPeaks);
cryptoPricesController.model.getPrices();
