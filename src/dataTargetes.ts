export interface Targeta {
    id: number;
    service: string;
    description: string;
    price: number;
}

const dataTargeta: Targeta[] = [
    {
        id: 1,
        service: "SEO",
        description: "Programació d'una web responsive completa",
        price: 300
    },
    {
        id: 2,
        service: "Ads",
        description: "Programació d'una web responsive completa",
        price: 400
    },
    {
        id: 3,
        service: "Web",
        description: "Programació d'una web responsive completa",
        price: 500
    },
]
export default dataTargeta;  