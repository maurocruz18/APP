import { lazy, Suspense } from 'react';
import { Loading } from 'react-admin';

const Dashboard = lazy(() => import('./Dashboard'));

const DashboardWrapper = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Dashboard />
		</Suspense>
	);
};

export default DashboardWrapper;
