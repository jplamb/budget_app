import React from 'react';
import { Routes, Route } from "react-router-dom";
import Budget from "./Budget";
import NavLayout from "./NavLayout";
import Envelopes from "./Envelopes";
import Calculators from "./Calculators";


const FinanceApp: React.FC = () => {
  return (
    <div className="FinanaceApp">
        <Routes>
            <Route path="/" element={<NavLayout />}>
                <Route index element={<Budget />} />
                <Route path="envelopes" element={<Envelopes />} />
                <Route path="calculators" element={<Calculators />} />
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