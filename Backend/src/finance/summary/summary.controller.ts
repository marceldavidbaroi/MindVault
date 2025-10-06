import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SummaryService } from './summary.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiResponse } from 'src/common/types/api-response.type';
import { FilterSummaryDto } from './dto/filter-summary.dto';

@Controller('summary')
@UseGuards(AuthGuard('jwt'))
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  /**
   * GET summaries based on optional filters:
   * - year
   * - month
   * - date
   * - detailLevel ('daily' | 'monthly' | 'yearly' | 'detailed')
   */
  @Get()
  async getSummaries(
    @Query() query: FilterSummaryDto,
    @GetUser() user: User,
  ): Promise<ApiResponse<any>> {
    const summaries = await this.summaryService.getSummaries(user.id, query);

    return {
      success: true,
      message: 'Summaries fetched successfully',
      data: summaries,
    };
  }
}
