import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detalle() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/2014/magic-items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        const favs = JSON.parse(localStorage.getItem("favs")) || [];
        setGuardado(favs.some(fav => fav.index === data.index));
      });
  }, [id]);

  if (!item) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Consultando el grimorio...</p>
      </div>
    );
  }

  const toggleFavorito = () => {
    const favs = JSON.parse(localStorage.getItem("favs")) || [];
    let nuevosFavs;
    if (guardado) {
      nuevosFavs = favs.filter(fav => fav.index !== item.index);
      setGuardado(false);
    } else {
      nuevosFavs = [...favs, item];
      setGuardado(true);
    }
    localStorage.setItem("favs", JSON.stringify(nuevosFavs));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{item.name}</h2>

        {item.rarity && (
          <div style={styles.rarezaContainer}>
            <span style={styles.rarezaBadge}>{item.rarity.name}</span>
          </div>
        )}

        {item.equipment_category && (
          <p style={styles.categoria}>{item.equipment_category.name}</p>
        )}

        <div style={styles.descripcion}>
          {item.desc?.map((parrafo, i) => (
            <p key={i} style={styles.parrafo}>{parrafo}</p>
          ))}
        </div>

        <button
          onClick={toggleFavorito}
          style={{
            ...styles.favBtn,
            background: guardado ? "rgba(200,180,120,0.15)" : "transparent",
            borderColor: "#c8b478",
            color: "#c8b478"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          {guardado ? "★ en tu colección" : "☆ guardar en colección"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a15 0%, #151525 50%, #0a0a15 100%)",
    color: "#e8e8e8",
    padding: "40px 20px",
    fontFamily: "'Georgia', 'Times New Roman', serif"
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0a15"
  },

  loadingText: {
    color: "#c8b478",
    fontSize: "1rem",
    letterSpacing: "2px"
  },

  card: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    padding: "35px",
    borderLeft: "4px solid #c8b478"
  },

  title: {
    fontSize: "2rem",
    fontWeight: "normal",
    letterSpacing: "3px",
    color: "#c8b478",
    marginBottom: "20px"
  },

  rarezaContainer: {
    marginBottom: "15px"
  },

  rarezaBadge: {
    fontSize: "0.75rem",
    padding: "4px 12px",
    borderRadius: "12px",
    background: "rgba(200,180,120,0.2)",
    color: "#c8b478",
    letterSpacing: "1px"
  },

  categoria: {
    fontSize: "0.8rem",
    opacity: 0.5,
    marginBottom: "25px",
    fontStyle: "italic"
  },

  descripcion: {
    marginBottom: "30px"
  },

  parrafo: {
    fontSize: "0.95rem",
    lineHeight: "1.8",
    opacity: 0.85,
    marginBottom: "12px"
  },

  favBtn: {
    padding: "10px 25px",
    border: "1px solid",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "0.85rem",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    fontFamily: "'Georgia', serif"
  }
};