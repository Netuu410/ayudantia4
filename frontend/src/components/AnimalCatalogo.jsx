import { useState, useEffect } from 'react';
import { API_URL } from '../api/config';

function AnimalCatalogo() {
  // Estados para el listado de animales
  const [animales, setAnimales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros
  const [especies, setEspecies] = useState([]);
  const [recintos, setRecintos] = useState([]);
  const [especieId, setEspecieId] = useState('');
  const [recintoId, setRecintoId] = useState('');

  // Estado del animal seleccionado (para ver detalle + comentarios)
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  // Estado del formulario de comentario nuevo
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [errorComentario, setErrorComentario] = useState(null);

  // 1. Cargar especies y recintos UNA VEZ (para llenar los <select>)
  useEffect(() => {
    fetch(`${API_URL}/especies`)
      .then((res) => res.json())
      .then((data) => setEspecies(data));

    fetch(`${API_URL}/recintos`)
      .then((res) => res.json())
      .then((data) => setRecintos(data));
  }, []);

  // 2. Cargar animales, y volver a cargar cada vez que cambie el filtro
  useEffect(() => {
    setCargando(true);
    const params = new URLSearchParams();
    if (especieId) params.append('especieId', especieId);
    if (recintoId) params.append('recintoId', recintoId);

    fetch(`${API_URL}/animals?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimales(data);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor');
        setCargando(false);
      });
  }, [especieId, recintoId]);

  // 3. Al hacer click en un animal, traer sus comentarios
    function verDetalle(animal) {
    setAnimalSeleccionado(animal);
    setErrorComentario(null);

    fetch(`${API_URL}/animals/${animal.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComentarios(data.comentarios || []));
  }

  // 4. Enviar un comentario nuevo
  function enviarComentario(e) {
    e.preventDefault();
    setErrorComentario(null);

        fetch(`${API_URL}/animals/${animalSeleccionado.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        autor: 'Anónimo',
        calificacion: 5,
        comentario: nuevoComentario,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // Zod devuelve 400 con { error, detalles: [{ campo, mensaje }] }
          const mensaje = data.detalles?.map((d) => d.mensaje).join(', ') || data.error;
          throw new Error(mensaje);
        }
        return data;
      })
      .then((comentarioCreado) => {
        setComentarios([...comentarios, comentarioCreado]);
        setNuevoComentario('');
      })
      .catch((err) => {
        setErrorComentario(err.message);
      });
  }

  if (cargando) return <p>Cargando animales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Catálogo de Animales</h2>

      {/* Filtros */}
      <div>
        <select value={especieId} onChange={(e) => setEspecieId(e.target.value)}>
          <option value="">Todas las especies</option>
          {especies.map((especie) => (
            <option key={especie.id} value={especie.id}>
              {especie.nombre}
            </option>
          ))}
        </select>

        <select value={recintoId} onChange={(e) => setRecintoId(e.target.value)}>
          <option value="">Todos los recintos</option>
          {recintos.map((recinto) => (
            <option key={recinto.id} value={recinto.id}>
              {recinto.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Listado */}
      <ul>
        {animales.map((animal) => (
          <li key={animal.id} onClick={() => verDetalle(animal)} style={{ cursor: 'pointer' }}>
            {animal.nombre} — {animal.especie?.nombre} ({animal.recinto?.nombre})
          </li>
        ))}
      </ul>

      {/* Detalle + comentarios */}
      {animalSeleccionado && (
        <div style={{ border: '1px solid gray', padding: '1rem', marginTop: '1rem' }}>
          <h3>{animalSeleccionado.nombre}</h3>
          <p>Edad: {animalSeleccionado.edad} años</p>
          <p>Peso: {animalSeleccionado.peso} kg</p>
          <p>Disponible: {animalSeleccionado.disponible ? 'Sí' : 'No'}</p>

          <h4>Comentarios</h4>
          <ul>
            {comentarios.map((c) => (
              <li key={c.id}>
                <strong>{c.autor}</strong> ({c.calificacion}★): {c.comentario}
              </li>
            ))}
          </ul>

          <form onSubmit={enviarComentario}>
            <input
              type="text"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <button type="submit">Enviar</button>
          </form>
          {errorComentario && <p style={{ color: 'red' }}>{errorComentario}</p>}
        </div>
      )}
    </div>
  );
}

export default AnimalCatalogo;