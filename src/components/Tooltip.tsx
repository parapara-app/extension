
export const Tooltip = ({ word, meanings }: { word: string; meanings: string[] }) => {
  return (
    <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10, borderRadius: 8, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}>
      <strong>{word}</strong>
      <ul style={{ paddingLeft: 20 }}>
        {meanings.map((meaning, idx) => (
          <li key={idx}>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(word)}+meaning`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {meaning}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};