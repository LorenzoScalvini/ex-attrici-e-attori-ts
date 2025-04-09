// Definisce il tipo base per una persona
export type Person = {
    readonly id: number;
    readonly name: string;
    birth_year: number;
    death_year?: number;
    biography: string;
    image: string;
};

// Estende Person aggiungendo dettagli specifici per attrici
export type Actress = Person & {
    most_famous_movies: [string, string, string]; // Tuple di 3 film
    awards: string;
    nationality: string; // Nazionalità predefinite (vedi controllo in `isActress`)
};