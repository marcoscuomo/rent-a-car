import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {

    constructor(private createSpecificationUserCase: CreateSpecificationUseCase){}

    handle(request: Request, response: Response): Response {
        
        const {name, description} = request.body;        

        this.createSpecificationUserCase.execute({name, description});

        return response.status(201).send();
    }
}

export { CreateSpecificationController }