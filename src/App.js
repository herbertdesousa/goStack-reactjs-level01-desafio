import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, [])

  // useEffect(() => {
  //   var value = 5

  //   var arr = [1, 2, 3, 4, 5, 3]

  //   arr = arr.filter(function(item) {
  //       return item !== value
  //   })

  //   console.log(arr)
  // },[])
 
  async function handleAddRepository() {
    const res = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    const newRepository = res.data;

    setRepositories([ ...respositories, newRepository ]);
  }

  async function handleRemoveRepository(id) {
    const url = `repositories/${id}`;
    await api.delete(url);

    // const repoIndex = respositories.findIndex(repository => repository.id === id);

    const newRepositories = respositories.filter(item => {
      return item.id !== id
    })

    setRepositories([ ...newRepositories ]);
    // console.log(typeof newRepositories);
    // console.log(typeof id);
    // console.log(respositories.splice(repo => repo.id == id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { respositories.map(({ id, title }) => ( 
          <li key={id}>
            {title}
            
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>) 
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
