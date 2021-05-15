import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationRepository{
    
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }    

    list(): Specification[] {
        
        return this.specifications;
    }
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }
    
    findByname(name: string): Specification {
        
        const specificationAlreadyExists = 
        this.specifications.find(specification => specification.name === name);

        return specificationAlreadyExists;
    }
    
}

export { SpecificationsRepository }