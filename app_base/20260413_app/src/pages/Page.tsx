import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<ExploreContainer name={'Test'} />
			</IonContent>
		</IonPage>
	);
};

export default Page;
