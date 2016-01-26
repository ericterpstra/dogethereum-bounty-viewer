Template.hello.onCreated( function() {

    this.autorun( () => {
        this.subscribe('contracts');
    });

});

Template.hello.helpers({

    dogeDAOBalance() {
        return Contracts.findOne({}).balance;
    },

    dogeDAOBalanceDGB(bal) {
        return EthTools.formatNumber( +EthTools.ticker.findOne('xdg').price * +bal, '0,0.00' );
    },

    dogeDAOBalanceBTC(bal) {
        return EthTools.formatNumber( +EthTools.ticker.findOne('btc').price * +bal, '0,0.00' );
    },

    dogeDAOBalanceUSD(bal) {
        return EthTools.formatNumber( +EthTools.ticker.findOne('usd').price * +bal, '0,0.00' );
    },

    dogeDAOBalanceEUR(bal) {
        return EthTools.formatNumber( +EthTools.ticker.findOne('eur').price * +bal, '0,0.00' );
    },

    dogeDAOBalanceGBP(bal) {
        return EthTools.formatNumber( +EthTools.ticker.findOne('cad').price * +bal, '0,0.00' );
    },

    members() {
        return Contracts.findOne({}).members;
    },

    proposals() {
        return Contracts.findOne({}).proposals;
    },

    isExecuted(executed) {
        return executed ? 'YEP!' : 'NOPE!';
    }

});