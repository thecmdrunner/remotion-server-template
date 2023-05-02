import {useState} from 'react';
import {continueRender, delayRender} from 'remotion';
import {AbsoluteFill, Sequence} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import {trpc} from './utils/trpc';

export const HelloWorld: React.FC = () => {
	const [handle] = useState(() => delayRender());

	const {data} = trpc.sayHello.useQuery(
		{text: 'Remotion + tRPC!'},
		{onSettled: () => continueRender(handle)}
	);

	return (
		<AbsoluteFill>
			<Logo />
			<Sequence from={35}>
				<Title
					titleText={data?.greeting ?? 'Loading...'}
					titleColor={'black'}
				/>
			</Sequence>
			<Subtitle />
		</AbsoluteFill>
	);
};
