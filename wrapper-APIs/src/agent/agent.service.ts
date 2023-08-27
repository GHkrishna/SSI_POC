// import { Injectable } from '@nestjs/common';
// import {HttpService} from '@nestjs/axios'
// import { map } from 'rxjs';
// import { exec } from 'child_process';
// import * as util from 'util';


// @Injectable()
// export class AgentService {

//   constructor(
//       private readonly httpService:HttpService
//   ){
//   }

//   async agentUp(){
   
//      try{

//         const agentStatus = '/home/gaurav/BE_PROJECT/vc_project/hello.sh';

//             const exec = util.promisify(require('child_process').exec);
//             const
//                 {
//                     error,
//                     stdout,
//                     stderr
//                 } = await exec(agentStatus);

//             console.log(`error ::: ${error}`);
//             console.log(`stdout ::: ${stdout}`);
//             console.log(`stderr ::: ${stderr}`);

//         exec('sshpass -p Waske@2311 ssh admin-1@192.168.43.184', (error, stdout, stderr) => {
//             if (error) {
//               console.error(`Error executing command: ${error}`);
//               return;
//             }
          
//             console.log(`Command output:\n${stdout}`);
//           });

            
//      }   
//      catch(e){
//             console.log(e);
//      } 
//  }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import { exec } from 'child_process';
// import * as util from 'util';
// import Docker from 'dockerode';
var Docker = require('dockerode');

// @Injectable()
// export class AgentService {
//     private docker: Docker;

//     constructor() {
//         this.docker = new Docker();
//     }

//     // async agentUp(containerNumber: number): Promise<void> {
//     //     try {
//     //         const containerName = `agent-${containerNumber}`;
//     //         const container = this.docker.getContainer(containerName);

//     //         const containerInfo = await container.inspect();
//     //         if (containerInfo.State.Running) {
//     //             console.log(`${containerName} is already running.`);
//     //             return;
//     //         }

//     //         const startCommand = `aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user${containerNumber} --wallet-name user${containerNumber} --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:800${containerNumber} --inbound-transport http 0.0.0.0 800${containerNumber} --outbound-transport http --log-level DEBUG --admin 0.0.0.0 900${containerNumber} --label user${containerNumber} --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision`;

//     //         const { stdout, stderr } = await exec(startCommand);
//     //         console.log(`Container started: ${stdout}`);
//     //     } catch (e) {
//     //         console.error(e);
//     //     }
//     // }
//     async agentUp(containerNumber: number): Promise<void> {
//         try {
//             const containerName = `agent-${containerNumber}`;
//             const imageName = 'bcgovimages/aries-cloudagent'; // Specify the image name
            
//             const containerInfo = await this.inspectContainer(containerName);
//             if (containerInfo.State.Running) {
//                 console.log(`${containerName} is already running.`);
//                 return;
//             }
    
//             const pullImageCommand = `docker pull ${imageName}`;
//             await this.runCommand(pullImageCommand); // Pull the Docker image
    
//             const startCommand = `docker run -d --name ${containerName} ${imageName} aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user${containerNumber} --wallet-name user${containerNumber} --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:800${containerNumber} --inbound-transport http 0.0.0.0 800${containerNumber} --outbound-transport http --log-level DEBUG --admin 0.0.0.0 900${containerNumber} --label user${containerNumber} --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision`; // Replace ... with the remaining part of the start command
//             await this.runCommand(startCommand);
//             console.log(`Container ${containerName} started.`);
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     async agentDown(containerNumber: number): Promise<void> {
//         try {
//             const containerName = `agent-${containerNumber}`;
//             const container = this.docker.getContainer(containerName);

//             const containerInfo = await container.inspect();
//             if (!containerInfo.State.Running) {
//                 console.log(`${containerName} is not running.`);
//                 return;
//             }

//             await container.stop();
//             console.log(`${containerName} stopped.`);
//         } catch (e) {
//             console.error(e);
//         }
//     }
// }
const onFinished = (err: Error | null, data: any) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Finished:', data);
    }
};

const onProgress = (event: any) => {
    console.log('Progress:', event);
};
// @Injectable()
// export class AgentService {
//   private docker: Docker;


//   constructor() {
//     this.docker = new Docker();
//   }

//   async agentUp(containerNumber: number): Promise<void> {
//     try {
//       const containerName = `agent-${containerNumber}`;
//       const imageName = 'bcgovimages/aries-cloudagent'; // Specify the image name

//       const containers = await this.docker.listContainers({ all: true });
//       const containerExists = containers.some(container => container.Names.includes(`/${containerName}`));

//       if (containerExists) {
//         console.log(`${containerName} is already running.`);
//         return;
//       }

//       await this.docker.pull(imageName, {}, (err, stream) => {
//         if (err) {
//           console.error(`Error pulling image ${imageName}: ${err.message}`);
//         } else {
//           this.docker.modem.followProgress(stream, onFinished, onProgress);
//         }
//       });

//       const startCommand = `aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user${containerNumber} --wallet-name user${containerNumber} --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:800${containerNumber} --inbound-transport http 0.0.0.0 800${containerNumber} --outbound-transport http --log-level DEBUG --admin 0.0.0.0 900${containerNumber} --label user${containerNumber} --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision`; // Replace ... with the remaining part of the start command
//       await this.docker.createContainer({
//         name: containerName,
//         Image: imageName,
//         Cmd: ['/bin/sh', '-c', startCommand],
//       });

//       console.log(`Container ${containerName} started.`);
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   async agentDown(containerNumber: number): Promise<void> {
//     try {
//       const containerName = `agent-${containerNumber}`;
//       const container = this.docker.getContainer(containerName);

//       const containerInfo = await container.inspect();
//       if (!containerInfo.State.Running) {
//         console.log(`${containerName} is not running.`);
//         return;
//       }

//       await container.stop();
//       await container.remove();
//       console.log(`${containerName} stopped and removed.`);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// }

import { promisify } from 'util';

@Injectable()
export class AgentService {
  private docker: any;

  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  async agentUp(containerNumber: number): Promise<void> {
    try {
      const containerName = `agent-${containerNumber}`;
      const imageName = 'bcgovimages/aries-cloudagent';

      const containers = await this.docker.listContainers({ all: true });
      const containerExists = containers.some(container => container.Names.includes(`/${containerName}`));

      if (containerExists) {
        console.log(`${containerName} is already running.`);
        return;
      }

      const pullAsync = promisify(this.docker.pull.bind(this.docker));
      await pullAsync(imageName, {}, (err, stream) => {
        if (err) {
          console.error(`Error pulling image ${imageName}: ${err.message}`);
        } else {
          this.docker.modem.followProgress(stream, onFinished, onProgress);
        }
      });

      const startCommand = `aca-py start --genesis-url http://test.bcovrin.vonx.io/genesis --wallet-key user${containerNumber} --wallet-name user${containerNumber} --wallet-type indy --wallet-storage-type default --endpoint http://0.0.0.0:800${containerNumber} --inbound-transport http 0.0.0.0 800${containerNumber} --outbound-transport http --log-level DEBUG --admin 0.0.0.0 900${containerNumber} --label user${containerNumber} --admin-insecure-mode --auto-accept-invites --auto-accept-requests --auto-respond-messages --auto-respond-credential-proposal --auto-respond-credential-offer --auto-respond-credential-request --auto-respond-presentation-proposal --auto-respond-presentation-request --auto-store-credential --auto-verify-presentation --auto-ping-connection --auto-provision`; // Replace ... with the remaining part of the start command
      const createOptions = {
        name: containerName,
        Image: imageName,
        Cmd: ['/bin/sh', '-c', startCommand],
      };
      await this.docker.createContainer(createOptions);

      console.log(`Container ${containerName} started.`);
    } catch (e) {
      console.error(e);
    }
  }

  async agentDown(containerNumber: number): Promise<void> {
    try {
      const containerName = `agent-${containerNumber}`;
      const container = this.docker.getContainer(containerName);

      const containerInfo = await container.inspect();
      if (!containerInfo.State.Running) {
        console.log(`${containerName} is not running.`);
        return;
      }

      await container.stop();
      await container.remove();
      console.log(`${containerName} stopped and removed.`);
    } catch (e) {
      console.error(e);
    }
  }
}

