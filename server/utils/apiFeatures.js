class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // remove fields
    const removeFields = ["keyword", "page", "limit"];
    console.log(queryCopy, "before");
    removeFields.forEach((key) => delete queryCopy[key]);
    console.log(queryCopy, "after");

    // filter price range and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPrePage) {
    const currentPage = Number(this.query.page) || 1;

    const skip = resultPrePage * (currentPage - 1);

    this.query = this.query.limit(resultPrePage).skip(skip);

    return this;
  }

}

module.exports = ApiFeatures;
