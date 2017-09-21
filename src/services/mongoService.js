class MongoService {

    regexExpression(search) {
        if (!search)
            return;
        return {
            "$regex": search,
            "$options": "i"
        };
    }

    ignoreCase(search) {
        if (!search)
            return;

        return {
            "$regex": search,
            "$options": "i"
        };

    }

}

module.exports = new MongoService();