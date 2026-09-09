// Lista los recintos del zoológico, mostrando cuántos animales tiene cada uno.
// Mismo patrón que EspecieList. 

import { useState, useEffect } from 'react';
import { API_URL } from '../api/config';

function RecintoList() {
  const [recintos, setRecintos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/recintos`)
      .then((res) => res.json())
      .then((data) => {
        setRecintos(data);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor');
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando recintos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Recintos</h2>
      <ul>
        {recintos.map((recinto) => (
          <li key={recinto.id}>
            {recinto.nombre} ({recinto.ubicacion}) — {recinto._count.animales} animal(es)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecintoList;