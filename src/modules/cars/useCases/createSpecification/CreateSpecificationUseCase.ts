import { CreateSpecificationService } from "../../services/CreateSpecificationService";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private createSpecificationService: CreateSpecificationService) {}

  execute({ name, description }: IRequest): void {
    this.createSpecificationService.execute({ name, description });
  }
}

export { CreateSpecificationUseCase };
