
class apiData {
    constructor(currency, coin) {
        this.currency = currency;
        this.coin = coin;
    }
    //funkcja pobierająca dane z api, w zależności albo pojedynczy peak albo cenę danej kryptowaluty we wszystkich walutach świata 
    async getData(type) {
        let response;
        let peakData = [];
        switch(type)
        {
            case "singlePeak":
                response = await fetch(`https://bravenewcoin-v1.p.rapidapi.com/ticker?show=${this.currency}&coin=${this.coin}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
                        "x-rapidapi-key": "c3ff41f804mshc6f623fde77d1c0p1b55cfjsnb869d1747d13"
                    }
                });
                break;
            case "priceList":
                response = await fetch(`https://bravenewcoin-v1.p.rapidapi.com/prices?coin=${this.coin}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
                        "x-rapidapi-key": "c3ff41f804mshc6f623fde77d1c0p1b55cfjsnb869d1747d13"
                    }
                })
                break;
        }
        
        const data = await response.json();
        return data;
    }
}




export default apiData;