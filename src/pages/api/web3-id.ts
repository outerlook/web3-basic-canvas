import type {APIRoute} from "astro";
import {pipe} from "effect";
import * as TE from "fp-ts/TaskEither";
import {INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, IPFS_API_ENDPOINT} from "@lib/environment";
import {createError} from "@lib/errors/create-error";

const auth = Buffer.from(
    `${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`
).toString('base64');

const httpClientTE = pipe(
    TE.tryCatch(
        (): Promise<{ id: string }> =>
            fetch(IPFS_API_ENDPOINT, {
                headers: { Authorization: `Basic ${auth}` },
            }).then(a => a.json()),
        createError('FETCH_ERROR')
    )
);

export const get: APIRoute = async (context) => {
    const result = await httpClientTE();
    const response = pipe(
        result,
        TE.fold(
            (error) => {
                console.error(error);
                return ({ status: 500, body: { error } });
            },
            (data) => ({ status: 200, body: { data } })
    ))
    return response()
}