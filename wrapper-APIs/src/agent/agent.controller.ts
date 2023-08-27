// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AgentService } from './agent.service';

// import { ApiTags } from '@nestjs/swagger';
// import { exec } from 'child_process';

// @Controller('agent')
//  export class AgentController {
//      constructor(private readonly agentService:AgentService){ }

//      @Post('/agent-up')
//      @ApiTags('agent')          //// create connection invitation between issuer ,holder and verifier
//      async agentUp(
//      ){
//          return this.agentService.agentUp();
//      }

//  }

import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiTags } from '@nestjs/swagger';

// import { Controller, Post, Param } from '@nestjs/common';
// import { AgentService } from './agent.service';
// import { ApiTags } from '@nestjs/swagger';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('/agent-up/:containerNumber')
  @ApiTags('agent')
  async agentUp(@Param('containerNumber') containerNumber: number) {
    await this.agentService.agentUp(containerNumber);
    return { message: `Container ${containerNumber} started.` };
  }

  @Post('/agent-down/:containerNumber')
  @ApiTags('agent')
  async agentDown(@Param('containerNumber') containerNumber: number) {
    await this.agentService.agentDown(containerNumber);
    return { message: `Container ${containerNumber} stopped.` };
  }
}
