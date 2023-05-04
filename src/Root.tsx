import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink, loggerLink} from '@trpc/client';
import {useState} from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {trpc} from './utils/trpc';
import superjson from 'superjson';
import {SERVER_URL} from './HelloWorld/constants';

export const RemotionRoot: React.FC = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		/** A set of type-safe react-query hooks for your tRPC API. */
		trpc.createClient({
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
					enabled: (opts) => true, // For now, show Logger links always.
					// process.env.NODE_ENV === 'development' ||
					// (opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${SERVER_URL}/trpc`,
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<>
					<Composition
						// You can take the "id" to render a video:
						// npx remotion render src/index.ts <id> out/video.mp4
						id="HelloWorld"
						component={HelloWorld}
						durationInFrames={150}
						fps={30}
						width={1920}
						height={1080}
						// You can override these props for each render:
						// https://www.remotion.dev/docs/parametrized-rendering
						defaultProps={{
							titleText: 'Welcome to Remotion',
							titleColor: 'black',
						}}
					/>
				</>
			</QueryClientProvider>
		</trpc.Provider>
	);
};
