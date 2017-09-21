'use strict';

const QUANTITY_PER_PAGE = require('../config/constants').QUANTITY_PER_PAGE;


class  PaginationService {

    calculateAndValidatePagination(query) {
        this.validate(query);
        return this.calculate(query);
    }

    validate(query) {

        if (!query.page)
            return;

        if (query.page <= 0)
            throw  new Error("A página não pode ser menor que zero");

        if (!query.quantityPerPage)
            return;

        if (query.quantityPerPage <= 0)
            throw new Error("A quantidade de registros por pagina não pode ser menor que zero");

    }

    calculate(query) {
        let page = parseInt(query.page || 1);
        let limit = parseInt(query.quantityPerPage || QUANTITY_PER_PAGE);
        let skip = (page - 1) * limit;
        skip = skip < 0 ? 0 : skip;

        return {
            limit,
            skip
        }
    }
}

module.exports = new PaginationService();
