import React from 'react';
import Navbar from '../Navbar/Navbar';

interface Mit {
  children: React.ReactNode;
}

const Layout: React.FC = ({ children }: Mit) => {
  return (
    <div>
      <Navbar />
      <section>{children}</section>
    </div>
  );
};
export default Layout;
