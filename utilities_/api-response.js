var ApiResponse = function (cnf) {
    if (!cnf) {
        cnf = {};
    }
    this.success = cnf.success || false;
    this.extras = cnf.extras || null;
};

module.exports = ApiResponse;