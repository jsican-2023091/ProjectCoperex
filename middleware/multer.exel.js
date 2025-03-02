import multer, { diskStorage } from "multer"
import { dirname, extname, join } from 'path'
import { fileURLToPath } from "url"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
const MAX_SIZE = 10000000 // Bytes (10MB)

const multerConfig = (destinationPath) => {
    return multer({
        storage: diskStorage({
            destination: (req, file, cb) => { // Dónde guardar
                const fullPath = join(CURRENT_DIR, destinationPath)
                req.filePath = fullPath
                cb(null, fullPath)
            },
            filename: (req, file, cb) => { // Nombre del archivo
                const fileExtension = extname(file.originalname)
                const fileName = file.originalname.split(fileExtension)[0]
                cb(null, `${fileName}-${Date.now()}${fileExtension}`)
            }
        }),
        fileFilter: (req, file, cb) => { // Validaciones de extensión
            if (MIMETYPES.includes(file.mimetype)) cb(null, true)
            else cb(new Error(`Only ${MIMETYPES.join(" ")} files are allowed`))
        },
        limits: { // Tamaño máximo
            fileSize: MAX_SIZE
        }
    })
}

export const uploadExcelFile = multerConfig('../uploads/excel')
