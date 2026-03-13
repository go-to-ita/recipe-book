import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecipesPage } from "./features/recipes/pages/RecipesPage";
import { RecipeDetailPage } from "./features/recipes/pages/RecipeDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
