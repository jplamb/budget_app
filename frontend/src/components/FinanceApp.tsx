import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Budget from "./Budget";
import NavLayout from "./NavLayout";


function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
const FinanceApp: React.FC = () => {
  return (
    <div className="FinanaceApp">
        <Routes>
            <Route path="/" element={<NavLayout />}>
                <Route index element={<Budget />} />
                <Route path="transactions" element={<div>Transactions!</div>} />
                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
    </div>
  );
};

export default FinanceApp;