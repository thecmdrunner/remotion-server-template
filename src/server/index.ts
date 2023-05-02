import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as trpcExpress from '@trpc/server/adapters/express';
import {mainRouter} from './router';
import {createTRPCContext, t} from './trpc';
import {SERVER_PORT} from '../HelloWorld/constants';

dotenv.config();

export const startServer = () => {
	const app = express();
	const port = SERVER_PORT;

	const tRPCMiddleware = trpcExpress.createExpressMiddleware({
		main: mainRouter,
		createContext: createTRPCContext,
	});

	app.use(cors({origin: '*'}));
	app.use(express.json());
	app.use('/trpc', tRPCMiddleware);

	app.post(`/getdata`, async (req, res) => {
		try {
			return res.status(200).json({message: 'Hello World!'});
		} catch (err) {
			console.error(err);
		}
	});

	return app.listen(port, () =>
		console.log(`Express server listening on ${port}`)
	);
};
