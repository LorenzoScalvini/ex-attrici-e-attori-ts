import { Actress } from './types';

// Controlla se un oggetto è di tipo `Actress`
function isActress(obj: any): obj is Actress {
    // Verifica tutte le proprietà richieste
    return (
        obj &&
        typeof obj.id === 'number' &&
        typeof obj.name === 'string' &&
        typeof obj.birth_year === 'number' &&
        (obj.death_year === undefined || typeof obj.death_year === 'number') &&
        typeof obj.biography === 'string' &&
        typeof obj.image === 'string' &&
        Array.isArray(obj.most_famous_movies) &&
        obj.most_famous_movies.length === 3 &&
        typeof obj.awards === 'string' &&
        [
            'American', 'British', 'Australian', 'Israeli-American',
            'South African', 'French', 'Indian', 'Israeli',
            'Spanish', 'South Korean', 'Chinese'
        ].includes(obj.nationality)
    );
}

// Fetch di un'attrice per ID (restituisce `Actress` o `null`)
async function getActress(id: number): Promise<Actress | null> {
    try {
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`);
        if (!response.ok) return null;
        const data = await response.json();
        return isActress(data) ? data : null;
    } catch (error) {
        console.error("Errore nel fetch:", error);
        return null;
    }
}

// Fetch di tutte le attrici (restituisce array di `Actress`)
async function getAllActresses(): Promise<Actress[]> {
    try {
        const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/actresses');
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data.filter(isActress) : [];
    } catch (error) {
        console.error("Errore nel fetch:", error);
        return [];
    }
}

// Fetch di più attrici in parallelo (restituisce array di `Actress | null`)
async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
    const promises = ids.map(id => getActress(id));
    return Promise.all(promises);
}

(async () => {
    const actress = await getActress(1);
    console.log(actress ? actress.name : "Non trovata");

    const allActresses = await getAllActresses();
    console.log("Trovate", allActresses.length, "attrici");

    const someActresses = await getActresses([1, 2, 3]);
    console.log(someActresses.map(a => a?.name || "Non trovata"));
})();