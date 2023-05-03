import {z} from 'zod';
import {createTRPCRouter, publicProcedure} from './trpc';

export const mainRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({text: z.string()}))
		.query(({input}) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
	sayHello: publicProcedure
		.input(z.object({text: z.string()}))
		.query(({input}) => {
			console.log('We are getting input!: ', input);
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
});

export type MainRouter = typeof mainRouter;
