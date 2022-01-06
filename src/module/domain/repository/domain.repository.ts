import { Between, EntityRepository, Equal, Repository } from 'typeorm';
import { Domain } from '../entity/domain.entity';

@EntityRepository(Domain)
export class DomainRepository extends Repository<Domain> {

  async createDomain(domain: Domain) {
    return await this.save(domain);
  }

  async fetchDomainData(request: any) {
    return await this.find({
      where: {
        domain: Equal(request.domain),
        scamadviser_updated_at: Between(new Date(request.from_date).toISOString(), new Date(request.to_date).toISOString()),
      },
    });
  }
}
