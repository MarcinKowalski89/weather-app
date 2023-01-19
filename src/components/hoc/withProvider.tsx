import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const withProvider = (Component: React.FC) => (
  <Provider store={store}>
    <Component />
  </Provider>
);

export default withProvider;