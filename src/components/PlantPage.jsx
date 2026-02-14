// PlantPage - Main container component
// Manages plants state, search, and passes props to children

import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // State for all plants
  const [plants, setPlants] = useState([]);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(error => console.error("Error fetching plants:", error));
  }, []);

  // Add new plant to state
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  // Filter plants by search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;