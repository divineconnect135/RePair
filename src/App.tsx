import { Route, Routes } from "react-router";
import BelongingsPage from "./pages/Belongings";
import HomePage from "./pages/HomePage";
import BelongingDetailsPage from "./pages/BelongingDetailsPage";
import EditBelongingPage from "./pages/EditBelongingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/belongings" element={<BelongingsPage />} />
        <Route path="/belongings/:id" element={<BelongingDetailsPage />} />
        <Route path="/belongings/:id/edit" element={<EditBelongingPage />} />
      </Routes>
    </>
  );
};

export default App;
