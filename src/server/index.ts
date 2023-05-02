import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import {exampleRouter} from './routers/example';
import {createTRPCContext, t} from './trpc';

dotenv.config();

export const startServer = () => {
	const app = express();
	const port = process.env.SERVER_PORT || 5050;

	const tRPCMiddleware = trpcExpress.createExpressMiddleware({
		router: exampleRouter,
		createContext: createTRPCContext,
	});

	app.use(cors({origin: '*'}));
	app.use('/trpc', tRPCMiddleware);
	app.use(express.json());

	app.post(`/getdata`, async (req, res) => {
		try {
		} catch (err) {
			console.error(err);
		}
	});

	return app.listen(port, () => {
		console.log(`TTS server listening on ${port}`);
	});
};
