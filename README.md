This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# VR-aikataulu sovellus
Sovellus käyttää avointa API:a joka löytyy täältä: http:/rata.digitraffic.fi/api/v1/doc/index.html .
![alt text](https://www.dropbox.com/s/b757vfa2yz0xuxq/Screenshot%202018-07-04%2011.37.00.png?raw=1)

React-demo-sovellus, jolla voi hakea junien aikatauluja aseman mukaan.

## Komponentit
### Station Page
Pääkomponentti applikaation rakentamiselle.
Props: 

### StationHeader
Komponentti sisältää yläheaderin.
Props: 

### StationNavBar
Navigointi lähtevien ja saapuvien junien välilehtien välillä.
Props: 
 * activePage (tiedon millä välilehdellä ollaan)

### StationSearchComponent
Komponentti asemahaulle. Käyttää react-select:iä.
Props: 
 * labelKey (Minkä mukaan etsitään, tässä: stationName)
 * stationList (Lista asemista)
 * selectedStation (callback-funktio, jota kutsutaan valitulla asemalla)
 
### TrainsPage
Komponentti junasivulle. Käytetään sekä saapuvien, että lähtevien junien näyttämisessä.
Props: 
 * stationTrains (taulukko junista, jotka pysähtyvät valitulla asemalla)
 * stationList (taulukko kaikista asemista)
 * selectedStation (Valittu asema)

### TrainInfoCmp
Komponentti yhden junan tietojen näyttämiseen taulukossa.
Props:
 * stopType (pysähdyksen tyyppi, tässä: 'ARRIVAL' tai 'DEPARTURE')
 * station (valittu asema)
 * train (juna jonka tiedot näytetään)
 * stationList (lista asemista)
