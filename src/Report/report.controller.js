//Lógica de Reporte
import Report from '../Report/report.model.js'
import Company from '../Company/company.model.js'
import ExcelJS from 'exceljs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

//Generar Reporte
export const generateReport = async (req, res) => {
    try {
        // Obtener todas las empresas
        const companies = await Company.find().populate(
            
            {
                path: 'category',
                select: 'name direction -_id',
            }
        )
        
 
        if (companies.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'No companies found to generate a report.',
                }
            )
        }
 
        // Crear una nueva instancia de ExcelJS Workbook
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Companies Report')
 
        // Definir las columnas del Excel
        worksheet.columns = [
            { header: 'Nombre de Empresa', key: 'name', width: 30 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 30 },
            { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
            { header: 'Categoria Empresarial', key: 'category', width: 30 },
            { header: 'Dirección', key: 'direction', width: 30 },
            { header: 'Contacto', key: 'contact', width: 30 },
            { header: 'Created At', key: 'registrationDay', width: 30 },
        ]
 
        // Agregar las filas de las empresas al Excel
        companies.forEach(company => {
            worksheet.addRow(
                {
                    name: company.name,
                    impactLevel: company.levelImpact,
                    yearsOfExperience: company.yearsExperiencie,
                    category: company.category && company.category.name ? company.category.name : 'N/A',
                    direction: company.direction,
                    contact: company.contact,
                    registrationDay: company.registrationDay,
                }
            )
        })
 
        // Definir la ruta de almacenamiento del archivo Excel
        const directoryPath = join(CURRENT_DIR, '../../uploads/excel') // Ruta donde se almacenará el archivo
        const filePath = join(directoryPath, `report_${Date.now()}.xlsx`) // Nombre del archivo con timestamp
 
        // Verificar si el directorio existe, si no, crear uno
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true })
        }
 
        // Guardar el archivo Excel en la ruta especificada
        await workbook.xlsx.writeFile(filePath)
 
        // Crear un registro en el modelo Report con la información del archivo generado
        const report = new Report(
            {
                companies: companies.map(company => company._id), // IDs de las empresas
                exelFile: filePath, // Ruta del archivo Excel
            }
        )
 
        await report.save()
 
        // Responder con el enlace al archivo generado
        return res.send(
            {
                success: true,
                message: 'Report generated successfully',
                companies,
                report,
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error generating report',
                err,
            }
        )
    }
}
