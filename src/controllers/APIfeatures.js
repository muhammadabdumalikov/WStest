class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr
            .replace(/\b(gte|gt|lt|lte|regex|in)\b/g, (match) => "$" + match)
            .split(",");

        let queries = JSON.parse(queryStr);
        // console.log(queries);

        if ("title" in queries && "$regex" in queries.title) {
            queries.title.$regex = new RegExp("^" + queries.title.$regex, "i");
        }
        if ("author" in queries && "$regex" in queries.author) {
            queries.author.$regex = new RegExp(
                "^" + queries.author.$regex,
                "i"
            );
        }

        this.query.find(queries);

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-month");
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIfeatures;
