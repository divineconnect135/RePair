import { Route, Routes } from "react-router";
import BelongingsPage from "./pages/Belongings";
import BelongingDetailsPage from "./pages/BelongingDetailsPage";
import EditBelongingPage from "./pages/EditBelongingPage";
import CreateBelongingPage from "./pages/CreateBelongingPage";
import CreateMaintenancePage from "./pages/CreateMaintenancePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BelongingsPage />} />
        <Route path="/belongings/:id" element={<BelongingDetailsPage />} />
        <Route path="/belongings/:id/edit" element={<EditBelongingPage />} />
        <Route path="/belongings/new" element={<CreateBelongingPage />} />
        <Route path="/belongings/:id/add" element={<CreateMaintenancePage />} />
      </Routes>
    </>
  );
};

export default App;
