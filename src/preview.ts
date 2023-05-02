import {spawn} from 'child_process';
import {startServer} from './server';

startServer();
spawn('npx', ['remotion', 'preview'], {
	stdio: 'inherit',
	shell: process.platform === 'win32' ? 'cmd.exe' : undefined,
});
