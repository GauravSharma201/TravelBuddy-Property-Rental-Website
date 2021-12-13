class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }
  search() {
    let keyword = this.queryStr.keyword
      ? {
          title: { $regex: this.queryStr.keyword, $options: 'i' },
        }
      : {}
    this.query = this.query.find({ ...keyword })

    return this
  }
  filter() {
    let queryString = { ...this.queryStr }
    let itemsToFilter = ['limit', 'keyword', 'page']
    itemsToFilter.forEach((elem) => delete queryString[elem])
    queryString = JSON.stringify(queryString)
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    )
    queryString = JSON.parse(queryString)
    this.query = this.query.find({ ...queryString })
    return this
  }
  pagination(resultPerPage) {
    let currentPage = Number(this.queryStr.page) || 1
    let numOfObjToSkip = resultPerPage * (currentPage - 1)
    this.query = this.query.limit(resultPerPage).skip(numOfObjToSkip)
    return this
  }
}

export default ApiFeatures
