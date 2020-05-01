import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const { data: repository } = await api.post('repositories', {
      url: "https://github.com/brunogayet",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
    
    const updateRepo = [...repositories];
    const repoRemoveIndex = updateRepo.findIndex(repository => repository.id === id);
    
    updateRepo.splice(repoRemoveIndex, 1);

    setRepositories(updateRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
