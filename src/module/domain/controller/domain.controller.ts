import { Router, Response, Request, NextFunction } from 'express';
import { authenticate } from '../../../middleware/authenticate';
import { DomainService } from '../services/domain.services';

export class DomainController {
  public router: Router;
  private domainService: DomainService;

  constructor() {
    this.router = Router();
    this.routes();
    this.domainService = new DomainService();
  }

  /**
   * Get domain details from scamadvisor and save to db
   */
  public domainAnalyse = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.domainService.domainAnalyse(req, res);
    res.send(response);
  };

  /**
   * Fetch the domain details from db based on scamadvisor update date and domain name (filter)
   */
  public fetchDomainDetails = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.domainService.fetchDomainDetails(req, res);
    res.send(response);
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.post('/domain/analyse', authenticate, this.domainAnalyse);
    this.router.post('/domain/fetch', authenticate, this.fetchDomainDetails);
  }
}
