import { DomainRepository } from '../repository/domain.repository';
import { Response, Request } from 'express';
import { getManager } from 'typeorm';
import { RequestHelper } from '../../common/request-helper';
import { Domain } from '../entity/domain.entity';

export class DomainService {
  private requestHelper: RequestHelper;

  constructor() {
    this.requestHelper = new RequestHelper();
  }

  async domainAnalyse(req: Request, res: Response) {
    try {
      const domainResoponse = await this.getAvailableTrustdataForDomain(req, res);
      if (domainResoponse != null) {
        const domain: Domain = this.setDomainModelData(domainResoponse);
        await this.createDomainDetailsToDb(domain);
        return domain;
      }
    } catch (error) {
      return res.send(error);
    }
  }

  async fetchDomainDetails(req: Request, res: Response) {
    try {
      const request = {
        domain: req['body'].domain,
        from_date: req['body'].from_date,
        to_date: req['body'].to_date,
      };
      let manager = getManager('domain_scam').getCustomRepository(DomainRepository);
      return manager.fetchDomainData(request);
    } catch (error) {
      return res.send(error);
    }
  }

  /**
   * Store domain details to our db
   */
  private async createDomainDetailsToDb(domain: Domain) {
    let manager = getManager('domain_scam').getCustomRepository(DomainRepository);
    await manager.createDomain(domain);
  }

  /**
   * scamAdvaiser api calls for getting the domain details using create batch and download result
   */
  private async getAvailableTrustdataForDomain(req: Request, res: Response) {
    const apikey = process.env.SCAMADVISER_API_KEY;
    const apiUrl = process.env.SCAMADVISER_API_URL + '?apikey=' + apikey + '&domain=' + req['body'].domain;
    return await this.requestHelper.get(apiUrl);
  }

  /**
   * Make the model for save domain details.
   */
  private setDomainModelData(data: any) {
    let domain = new Domain();
    domain.domain = data.domain;
    domain.score = data.score;
    domain.blacklisted = data.blacklisted;
    domain.popularity_rank = data.popularity.rank;
    domain.ssl_valid = data.ssl.valid;
    domain.scamadviser_created_at = new Date(data.created_at * 1000);
    domain.scamadviser_updated_at = new Date(Number(data.updated_at) * 1000);
    return domain;
  }
}
