import '../styles/index.css';
import { TodosProvider } from '../context/TodosContext';
import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({
	showSpinner: true,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<TodosProvider>
			<div className="container mx-auto my-6 max-w-xl">
				<Component {...pageProps} />
			</div>
		</TodosProvider>
	);
}

export default MyApp;
