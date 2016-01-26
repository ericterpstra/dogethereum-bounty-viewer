// Price ticker
DogeTicker = {};

DogeTicker.ticker = new Mongo.Collection('ethereum_price_ticker', {connection: null});

if(Meteor.isClient)
    new PersistentMinimongo(DogeTicker.ticker);

var updatePrice = function(e, res){
    if(!e && res.statusCode === 200 && res.data && _.isEmpty(res.data.error)){
        _.each(res.data.result, function(item, key){
            var name = key.replace('XETHZ','').toLowerCase();

            if(key === 'XETHXXBT')
                name = 'btc';

            if(key === 'XXBTXXDG')
                name = 'doge';


            // make sure its a number and nothing else!
            if(_.isFinite(item.c[0])) {
                DogeTicker.ticker.upsert(name, {$set: {
                    price: String(item.c[0])
                }});
            }

        });
    } else {
        console.warn('Can not connect to http://api.kraken.com to get price ticker data, please check your internet connection.');
    }
};

// update right away
HTTP.get('https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XETHZUSD,XETHZGBP,XETHZJPY,XETHZCAD,XETHXXBT,XXBTXXDG', updatePrice);


// update prices
Meteor.setInterval(function(){
    HTTP.get('https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XETHZUSD,XETHZGBP,XETHZJPY,XETHZCAD,XETHXXBT,XXBTXXDG', updatePrice);
}, 1000 * 60 * 3);