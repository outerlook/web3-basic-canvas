import { create, IPFS } from 'ipfs-core';
import * as TE from 'fp-ts/TaskEither';
import {
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
  IPFS_API_ENDPOINT,
} from '@lib/environment';
import { pipe } from 'effect';
import { createError } from '@lib/errors/create-error';



export const ipfs = TE.fromTask(async () => create());

export const connectIpfsTE = (ipfs: IPFS) => (id: string) =>
  TE.tryCatch(
    () => ipfs.swarm.connect(`/dns4/ipfs.infura.io/tcp/5001/wss/p2p/${id}`),
    createError('SWARM_CONNECT_ERROR')
  );
