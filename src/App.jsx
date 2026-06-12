import Header from "./components/Header";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1">
        {/* paginile tale aici */}
        <h1>Hello world</h1>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}