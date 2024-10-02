import { Injectable } from "@nestjs/common";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { Repository } from "typeorm";
import { ActivateHistory } from "@common/models/entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(ActivateHistory)
        private readonly historyRepository: Repository<ActivateHistory>,
    ) {}

    async create(createHistoryDto: CreateHistoryDto) {
        await this.historyRepository.save(createHistoryDto);
    }

    findAll() {
        return `This action returns all history`;
    }

    findOne(id: number) {
        return `This action returns a #${id} history`;
    }

    update(id: number, updateHistoryDto: UpdateHistoryDto) {
        return `This action updates a #${id} history`;
    }

    remove(id: number) {
        return `This action removes a #${id} history`;
    }
}
