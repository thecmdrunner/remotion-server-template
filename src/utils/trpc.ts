/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the React App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import {createTRPCProxyClient, httpBatchLink, loggerLink} from '@trpc/client';
import {createTRPCReact} from '@trpc/react-query';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';
import superjson from 'superjson';
import {SERVER_URL} from '../HelloWorld/constants';
import {MainRouter, mainRouter} from '../server/router';

export const trpc = createTRPCReact<MainRouter>({});

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCProxyClient<MainRouter>({
	/**
	 * Transformer used for data de-serialization from the server.
	 *
	 * @see https://trpc.io/docs/data-transformers
	 */
	transformer: superjson,
	/**
	 * Links used to determine request flow from client to server.
	 *
	 * @see https://trpc.io/docs/links
	 */
	links: [
		loggerLink({
			enabled: (opts) =>
				process.env.NODE_ENV === 'development' ||
				(opts.direction === 'down' && opts.result instanceof Error),
		}),
		httpBatchLink({
			url: `${SERVER_URL}/trpc`,
		}),
	],
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['main']['hello']
 */
export type RouterInputs = inferRouterInputs<MainRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['main']['hello']
 */
export type RouterOutputs = inferRouterOutputs<MainRouter>;
