import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipesPage } from "./features/recipes/pages/RecipesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<RecipesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
