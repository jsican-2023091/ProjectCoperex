//Lógica de Categoria
import Category from '../Category/category.model.js'

//Save
export const saveCategory = async(req, res) => {
    try {
        let  data = req.body
        let category = new Category(data)

        await category.save()
        return res.send(
            {
                succes: true,
                message: `The Category was saved succesfully, with the name ${category.name}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).sen(
            {
                succes: false,
                message: 'General error with saving category',
                err
            }
        )
    }
}

export const updateCategory = async(req, res) => {
    const { id } = req.params
    const { ...data } = req.body

    try {
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error with saving Category'
            }
        )
    }
}

export const getAll = async(req, res) => {
    const { limit, skip } = req.query
    try {
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)
        if(categories.length === 0){
            return res.send(
                {
                    succes: false,
                    message: 'Categories not found',
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Categories found',
                total: categories.length,
                categories
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}