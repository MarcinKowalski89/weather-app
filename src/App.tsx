import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from './components/Layout';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const App = () => (
  <div className="App">
    <Layout sidebar={<Sidebar />}>
      <Map />
    </Layout>
  </div>
);

export default App;
