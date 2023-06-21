module.exports = (sequelize, Sequelize) => {
    return sequelize.define("help", {
        email: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
        }
    });
};