import './../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="container my-5">
            <div className="text-center">
                <h1 className="display-4 mb-4">Projekt Grupowy</h1>
                <p className="lead">
                    Naszym projektem jest aplikacja webowa stworzona przy użyciu React i .NET,
                    która umożliwia zarządzanie zadaniami w formie tablicy Kanban. Projekt
                    zawiera funkcjonalności takie jak logowanie, rejestracja użytkowników,
                    oraz efektywne zarządzanie zadaniami.
                </p>
            </div>

            <h3 className="mt-5">Kluczowe funkcje projektu:</h3>
            <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Tablica Kanbanowa do wizualizacji i organizacji zadań</li>
                <li className="list-group-item">System logowania i rejestracji użytkowników</li>
                <li className="list-group-item">Możliwość dodawania, edytowania i usuwania zadań</li>
                <li className="list-group-item">Przyjazny interfejs użytkownika stworzony przy użyciu React</li>
                <li className="list-group-item">Backend obsługiwany przez .NET dla skalowalności i bezpieczeństwa</li>
            </ul>
        </div>
    );
}

export default Home;
