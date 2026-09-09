// Lista las especies del zoológico, mostrando cuántos animales tiene cada una.
// Este componente ya está resuelto - úsalo como referencia para construir el catálogo de Animales.

import { useState, useEffect } from 'react';
import { API_URL } from '../api/config';

function EspecieList() {
  const [especies, setEspecies] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/especies`)
      .then((res) => res.json())
      .then((data) => {
        setEspecies(data);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor');
        setCargando(false);
      });
  }, []); // se ejecuta una sola vez, al montar el componente

  if (cargando) return <p>Cargando especies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Especies</h2>
      <ul>
        {especies.map((especie) => (
          <li key={especie.id}>
            {especie.nombre} — {especie._count.animales} animal(es)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EspecieList;