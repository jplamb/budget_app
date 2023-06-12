import React from "react";
import {Link, Outlet} from "react-router-dom";

const NavItems = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "Envelopes",
        path: '/envelops'
    },
    {
        name: "Calculators",
        path: '/calculators'
    },
    {
        name: "Budget",
        path: '/budget'
    }
];

const NavLayout: React.FC = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">BudgetApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {NavItems.map((item, index) => (
                                <li className="nav-item" key={`nav-item-${index}`}>
                                    <Link className="nav-link" to={item.path}>{item.name}</Link>
                                </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};
export default NavLayout;
