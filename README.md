# BitcoinApp

Application prepared specially for Coders Camp as a third required project in plain html, css and javascript with webpack module bundler. 
This application was made in order to monitor current cryptocurrencies rates on a stock and analyze historical trends up to 15 years back.

## Functionality

On application startup there are downloading available cryptocurrencies and currencies into datalist from different API endpoints.
Based on those values we can decide how detailed chart we want to generate by setting interval value. 
Next we can decide what kind of period of time we want to analyze by checking 24h period checkbox, which results in very detailed chart up to every minute in 24 period of time or we can set start date and end date of longer period of time.
As an additional feature you can pick colors of data points and line of a chart.
On a bottom of a website there is a banner with a current rates of the most commonly used cryptocurrencies exchanged to polish z³oty.
In case of wrong interval value error message will pop up (see Wrong Interval Error image).
Try it out here: https://micavanco.github.io/BitcoinApp/

## Screenshots
### 24h Period
![alt text](https://raw.githubusercontent.com/micavanco/BitcoinApp/master/src/assets/page.png)
### Year Period
![alt text](https://raw.githubusercontent.com/micavanco/BitcoinApp/master/src/assets/page2.png)
### Wrong Interval Error
![alt text](https://raw.githubusercontent.com/micavanco/BitcoinApp/master/src/assets/page3.png)