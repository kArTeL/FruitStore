var winston = require('winston'); 

module.exports = {
    getLogger: function () {
        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: 'successAttacks.csv' })
            ]
        });
        return logger;
    }
};
