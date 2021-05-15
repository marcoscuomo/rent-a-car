import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    constructor(private categoryRepository: ICategoryRepository){}

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();
            
            stream.pipe(parseFile);

            parseFile.on('data', async(line) => {
                
                //['name', 'description']
                const [name, description] = line;

                categories.push({
                    name, 
                    description
                });
            }).on('end', () => {
                resolve(categories)
            }).on('error', (err) => {
                reject(err);
            })

            // return categories;
        });
    }
    
    
    async execute(file: Express.Multer.File): Promise<void> {
        
        const categories = await this.loadCategory(file);
        
        categories.map( async (category) => {
            const { name, description} = category;

            const existsCategory = this.categoryRepository.findByName(name);

            if(!existsCategory){
                this.categoryRepository.create({
                    name, 
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase }