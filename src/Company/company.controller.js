//Lógica de la compañia
import Company from './company.model.js'
import Category from '../Category/category.model.js'

//
export const saveCompany = async(req, res) => {
    try {
        const { category } = req.body
        let data = req.body
        // Verificar si la categoría existe
        const categoryid = await Category.findById(category)
        if (!categoryid) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found, cannot save this Company'
                }
            )
        }
        let company = new Company(data)

        await company.save()
        return res.send(
            {
                succes: true,
                message: `The company was saved successfully. with the name ${company.name}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error with saving Company',
                err
            }
        )
    }
}


//Update
export const update = async(req, res) =>{
    const { id } = req.params
    const { ...data } = req.body
    try {
        const updateCompany = await Company.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateCompany) return res.status(404).send(
            {
                success:false,
                message: 'Company not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Company updated succesfully',
                updateCompany
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding Company',
                err
            }
        )
    }
}

//GetAll
export const getAll = async(req, res) => {
    const { limit, skip } = req.query
    try {
        const company = await Company.find()
            .skip(skip)
            .limit(limit)
        if(company.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Company found',
                total: company.length,
                company
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

// Obtener compañías filtradas por años de experiencia
export const getCompaniesByExperience = async (req, res) => {
    try {
        const { yearsExperience, limit, skip } = req.query
        let filter = {}

        if (yearsExperience) {
            filter.YearsExperiencie = yearsExperience
        }

        const companies = await Company.find(filter)
            .skip(parseInt(skip) || 0)
            .limit(parseInt(limit) || 10)

        if (companies.length === 0) {
            return res.send(
                {
                    success: false, 
                    message: 'No companies found with the given experience' 
                }
            )
        }

        return res.send(
            { 
                success: true, 
                message: 'Companies retrieved successfully', 
                total: companies.length, companies 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error while retrieving companies', 
                err 
            }
        )
    }
}

// Obtener compañías filtradas por categoría
export const getCompaniesByCategory = async (req, res) => {
    try {
        const { category, limit, skip } = req.query
        let filter = {}

        if (category) {
            filter.category = category
        }

        const companies = await Company.find(filter)
            .skip(parseInt(skip) || 0)
            .limit(parseInt(limit) || 10)

        if (companies.length === 0) {
            return res.send(
                { 
                    success: false, 
                    message: 'No companies found with the given category' 
                }
            )
        }

        return res.send(
            { 
                success: true, 
                message: 'Companies retrieved successfully', 
                total: companies.length, 
                companies 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error while retrieving companies', 
                err 
            }
        )
    }
}

// Obtener compañías ordenadas de A-Z
export const getCompaniesSortedAZ = async (req, res) => {
    try {
        const { limit, skip } = req.query

        const companies = await Company.find()
            .sort({ name: 1 })
            .skip(parseInt(skip) || 0)
            .limit(parseInt(limit) || 10)

        if (companies.length === 0) {
            return res.send(
                { 
                    success: false, 
                    message: 'No companies found' 
                }

            )
        }

        return res.send(
            { 
                success: true, 
                message: 'Companies sorted A-Z successfully',
                 total: companies.length, 
                 companies 
                }
            )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                 success: false, 
                 message: 'General error while retrieving companies', 
                 err 
            }
        )
    }
}