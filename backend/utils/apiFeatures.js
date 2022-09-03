class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        
    }
    filter() {
        const qeueryObj = {...this.queryStr};
       
    const excludedFields = ['page','sort','limit','fields'];
    excludedFields.forEach(el => delete qeueryObj[el]);
    
    //exclude unwanted queries when rreading from mongo
    

    //2 advanced filtering
    this.queryStr = JSON.stringify(qeueryObj);
    this.queryStr = this.queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`); //stackoverflow to replace lte with $lte 

    this.query = this.query.find(JSON.parse(this.queryStr));

    return this;
    //OR
    //await Tour.find().where('duration').equals(); //etc..
    }
    sort() {
        if(this.queryStr.sort) {
            //log the sort , is an array
        const sortBy = this.query.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy) //sort('price 'rating') toSort other critierias if first is equal
     }
     else{
        this.query = this.query.sort('-createdAt') //Default Sort (-) => descending order
     }
     return this;
    }
    limitFields() {
        if(this.queryStr.fields) {
        const fields = this.query.fields.split(',').join(' ');
        this.query = this.query.select(fields);
     }
     else{
        this.query = this.query.select('-__v');
     }
     console.log(1)
     return this;
    }
    paginate() {
        
     const page = this.queryStr.page*1 || 1;
     const limit = this.queryStr.limit*1 || 100;
     const skip = (page-1) * limit
    
     //page=2&limit=10, -> skip 10, start from 11-20 
    this.query = this.query.skip(skip).limit(limit)
    
        return this;
    }
}

module.exports = APIFeatures;