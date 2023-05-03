/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the React App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import {createTRPCReact} from '@trpc/react-query';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';
import {MainRouter} from '../server/router';

export const trpc = createTRPCReact<MainRouter>();

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
