import { LayoutProps } from './Layout.types';
import './Layout.scss';

const Layout = ({
  sidebar,
  children
}: LayoutProps) => (
  <div className="layout">
    <div className="sidebar">
      {sidebar}
    </div>
    <div className="map">
      {children}
    </div>
  </div>
);

export default Layout;