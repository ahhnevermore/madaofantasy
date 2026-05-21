export default function App() {
  console.log("App component rendered (fallback)");
  return (
    <div style={{ marginTop: 40, textAlign: "center" }}>
      <h4>Fastify + React (Client)</h4>
      <p>
        Server health is available at <code>/api/health</code>.
      </p>
    </div>
  );
}
