import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {useState} from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {trpc} from './utils/trpc';
import superjson from 'superjson';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: superjson,

			links: [
				httpBatchLink({
					url: 'http://localhost:5050/trpc',
				}),
			],
		})
	);

	return (
		<>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
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
					{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
					<Composition
						id="OnlyLogo"
						component={Logo}
						durationInFrames={150}
						fps={30}
						width={1920}
						height={1080}
					/>
				</QueryClientProvider>
			</trpc.Provider>
		</>
	);
};
