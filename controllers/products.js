import Product from './../models/product.js';

export const GetALLProductsStatic = async (req,res)=>{
    // you can filter by anything you want here !
    const search = 'a'
    const products = await Product.find({
        name:{$regex: search },
        // price:{$gt:30}
    })
    res.status(200).json({msg_Your_Products:products , NBProd:products.length})
}

export const GetALLProducts = async (req,res)=>{
    // console.log(req.query)
    const {featured,company,name,sort,fields,numericFilters} = req.query   //Search by featured or company or name 
    const queryObject = {}
    console.log(featured,company,name,sort,fields,numericFilters)

    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company){
        queryObject.company = company
    }

// Replace This 
    // if (name){
    //     queryObject.name = name
    // }
// BY This one :
    if (name){
        queryObject.name = {$regex: name }   // exp of resultat {name: { '$regex': 'accent chair' } }
    }
    
    console.log(queryObject)
    let result = Product.find(queryObject)  //cad find where { featured: true }
    // use to sort resultat
    // exp http://localhost:3000/api/products?sort=name,-price
    if(sort){
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }else{
        result = result.sort('CreateAt')
    }

    // use to get from resultat only fields passed in 
    // exp  http://localhost:3000/api/products?fields=name,price
    if(fields){
        const fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList)
    }


    if (numericFilters){
        const operateurMap = {
            ">":'$gt',
            ">=":'$gte',
            "<":'$lt',
            "<=":'$lte',
            "=":'$eg',
        }
        const RegulExpr = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(RegulExpr,(match)=>`--${operateurMap[match]}`)
        console.log(filters)
        const option = ['price','rating']
        filters = filters.split(',').forEach((element) => {
            const [field,operator,value] = element.split('-')
            if(option.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }

    const page = Number(req.query.page) || 1      // 1 if user don't pass a value
    const limit = Number(req.query.limit) || 10

    // for exp==>  http://localhost:3000/api/products?sort=name,-price&limit=1
    result = result.limit(limit)

    // let resulte = Product.find(queryObject)
    const products = await result
    // const products = await Product.find({}).sort({price:-1}).limit(4).select({name:-1}).skip(3)   
    res.status(200).json({msg_Your_Products:products , NBProd:products.length})
}