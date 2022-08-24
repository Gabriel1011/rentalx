import { inject, injectable } from "tsyringe";

import { CreateSpecificationService } from "../../services/CreateSpecificationService";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("CreateSpecificationService")
    private createSpecificationService: CreateSpecificationService
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    await this.createSpecificationService.execute({ name, description });
  }
}

export { CreateSpecificationUseCase };
