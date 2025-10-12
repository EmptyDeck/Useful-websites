// === Language handling ===
// Using in-memory storage instead of localStorage
let selectedLanguage = "ko"; // Default language
const lang = selectedLanguage;
console.log("Selected language:", lang);

// === Translations ===
const translations = {
  en: {
    region: "Region",
    transport: "Transport / Time to Helsinki",
    good: "Good",
    bad: "Bad",
    view: "View on Airbnb →",
    total: "total",
    perPerson: "per person",
    extraFee: "extra fee"
  },
  es: {
    region: "Región",
    transport: "Transporte / Tiempo a Helsinki",
    good: "Ventajas",
    bad: "Desventajas",
    view: "Ver en Airbnb →",
    total: "total",
    perPerson: "por persona",
    extraFee: "tarifa adicional"
  },
  fi: {
    region: "Alue",
    transport: "Kuljetus / Aika Helsinkiin",
    good: "Hyvää",
    bad: "Huonoa",
    view: "Näytä Airbnb:ssä →",
    total: "yhteensä",
    perPerson: "per henkilö",
    extraFee: "lisämaksu"
  },
  fr: {
    region: "Région",
    transport: "Transport / Temps vers Helsinki",
    good: "Avantages",
    bad: "Inconvénients",
    view: "Voir sur Airbnb →",
    total: "total",
    perPerson: "par personne",
    extraFee: "frais supplémentaires"
  },
  ko: {
    region: "지역",
    transport: "교통 / 헬싱키까지 시간",
    good: "장점",
    bad: "단점",
    view: "Airbnb에서 보기 →",
    total: "총",
    perPerson: "1인당",
    extraFee: "추가 요금"
  }
};

// === Listing Data by Language ===
const listingsData = {
  en: [
    {
      id: 1,
      name: "Private room in a home in Vantaa, Finland",
      cost: "€875",
      costBreakdown: "€875 total",
      region: "Vantaa",
      transport: "Yes but complicated",
      timeToHelsinki: "1h",
      good: "Lots of beds + Cheap",
      bad: "We have to live with the owner",
      link: "https://www.airbnb.co.kr/rooms/10304791?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "1.avif"
    },
    {
      id: 2,
      name: "Entire home in Espoo, Finland",
      cost: "€730",
      costBreakdown: "€730 total",
      region: "Between Espoo and Helsinki",
      transport: "It's ok",
      timeToHelsinki: "1h",
      good: "1 sofa + 2 double beds + 2 super singles",
      bad: "",
      link: "https://www.airbnb.co.kr/rooms/1055966006652479049?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "2.avif"
    },
    {
      id: 3,
      name: "Entire cottage in Lohja, Finland",
      cost: "€715",
      costBreakdown: "€635 + €80 (€10 per person)",
      region: "Lohja",
      transport: "No public transport",
      timeToHelsinki: "N/A",
      good: "Has a boat with a lake",
      bad: "No running water (it has a well) + No Wi-Fi + Toilet outside",
      link: "https://www.airbnb.co.kr/rooms/35242538?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "3.avif"
    },
    {
      id: 4,
      name: "Entire cottage in Ingå, Finland",
      cost: "€754",
      costBreakdown: "€754 total",
      region: "Ingå",
      transport: "No public transport",
      timeToHelsinki: "N/A",
      good: "Overall good",
      bad: "Transport difficulty",
      link: "https://www.airbnb.co.kr/rooms/612009176188095822?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "4.avif"
    },
    {
      id: 5,
      name: "Entire home in Espoo, Finland",
      cost: "€675",
      costBreakdown: "€675 total",
      region: "Espoo",
      transport: "Yes but complicated",
      timeToHelsinki: "1h",
      good: "Cheap",
      bad: "Half of the people have to sleep on a sofa",
      link: "https://www.airbnb.co.kr/rooms/1408786054005263055?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "5.avif"
    },
    {
      id: 6,
      name: "Entire condo in Vantaa, Finland",
      cost: "€477",
      costBreakdown: "€477 total",
      region: "Vantaa",
      transport: "Very good",
      timeToHelsinki: "35min",
      good: "Cheap + Close to Helsinki",
      bad: "Shared apartment sauna + City area",
      link: "https://www.airbnb.co.kr/rooms/1523754978826325834?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "6.avif"
    },
    {
      id: 7,
      name: "Entire home in Espoo, Finland (with sauna)",
      cost: "€880",
      costBreakdown: "€710 + €80 (€10 per person) + €80 for sauna",
      region: "Espoo",
      transport: "Yes but complicated",
      timeToHelsinki: "1h",
      good: "Nature + Outdoor BBQ + Sauna",
      bad: "Expensive",
      link: "https://www.airbnb.co.kr/rooms/1190543962899825319?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "7.avif"
    },
    {
      id: 8,
      name: "Entire home in Espoo, Finland (nature)",
      cost: "€900",
      costBreakdown: "€820 + €80 (€10 per person)",
      region: "Espoo",
      transport: "Yes but complicated",
      timeToHelsinki: "1h",
      good: "Nature + Outdoor BBQ",
      bad: "Expensive",
      link: "https://www.airbnb.co.kr/rooms/1240981931923036916?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "8.avif"
    },
    {
      id: 9,
      name: "Entire villa in Kypäri, Finland",
      cost: "€970",
      costBreakdown: "€970 total",
      region: "Kypäri",
      transport: "No public transport (36min by car)",
      timeToHelsinki: "36min by car",
      good: "Big house",
      bad: "Expensive + Car required",
      link: "https://www.airbnb.co.kr/rooms/657625381223499931?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "9.avif"
    },
    {
      id: 10,
      name: "Entire condo in Helsinki, Finland",
      cost: "€1200",
      costBreakdown: "€1200 total",
      region: "Helsinki",
      transport: "Excellent",
      timeToHelsinki: "City center",
      good: "Helsinki city center + Convenient transport",
      bad: "Expensive",
      link: "https://www.airbnb.co.kr/rooms/710819953484653387?check_in=2025-11-27&check_out=2025-12-01&guests=1&adults=7&s=67&unique_share_id=f6dae256-4814-4acc-9c53-c848c7e736fd",
      img: "10.jpeg"
    }
  ],
  es: [
    {
      id: 1,
      name: "Habitación privada en una casa en Vantaa, Finlandia",
      cost: "€875",
      costBreakdown: "€875 total",
      region: "Vantaa",
      transport: "Sí, pero complicado",
      timeToHelsinki: "1h",
      good: "Muchas camas + Barato",
      bad: "Tenemos que vivir con el dueño",
      link: "https://www.airbnb.co.kr/rooms/10304791?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "1.avif"
    },
    {
      id: 2,
      name: "Casa completa en Espoo, Finlandia",
      cost: "€730",
      costBreakdown: "€730 total",
      region: "Entre Espoo y Helsinki",
      transport: "Está bien",
      timeToHelsinki: "1h",
      good: "1 sofá + 2 camas dobles + 2 camas individuales grandes",
      bad: "",
      link: "https://www.airbnb.co.kr/rooms/1055966006652479049?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "2.avif"
    },
    {
      id: 3,
      name: "Cabaña completa en Lohja, Finlandia",
      cost: "€715",
      costBreakdown: "€635 + €80 (€10 por persona)",
      region: "Lohja",
      transport: "Sin transporte público",
      timeToHelsinki: "N/A",
      good: "Tiene un barco con un lago",
      bad: "Sin agua corriente (tiene un pozo) + Sin Wi-Fi + Baño exterior",
      link: "https://www.airbnb.co.kr/rooms/35242538?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "3.avif"
    },
    {
      id: 4,
      name: "Cabaña completa en Ingå, Finlandia",
      cost: "€754",
      costBreakdown: "€754 total",
      region: "Ingå",
      transport: "Sin transporte público",
      timeToHelsinki: "N/A",
      good: "En general bueno",
      bad: "Dificultad de transporte",
      link: "https://www.airbnb.co.kr/rooms/612009176188095822?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "4.avif"
    },
    {
      id: 5,
      name: "Casa completa en Espoo, Finlandia",
      cost: "€675",
      costBreakdown: "€675 total",
      region: "Espoo",
      transport: "Sí, pero complicado",
      timeToHelsinki: "1h",
      good: "Barato",
      bad: "La mitad de las personas tienen que dormir en un sofá",
      link: "https://www.airbnb.co.kr/rooms/1408786054005263055?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "5.avif"
    },
    {
      id: 6,
      name: "Condominio completo en Vantaa, Finlandia",
      cost: "€477",
      costBreakdown: "€477 total",
      region: "Vantaa",
      transport: "Muy bueno",
      timeToHelsinki: "35min",
      good: "Barato + Cerca de Helsinki",
      bad: "Sauna pública del apartamento + Zona urbana",
      link: "https://www.airbnb.co.kr/rooms/1523754978826325834?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "6.avif"
    },
    {
      id: 7,
      name: "Casa completa en Espoo, Finlandia (con sauna)",
      cost: "€880",
      costBreakdown: "€710 + €80 (€10 por persona) + €80 por sauna",
      region: "Espoo",
      transport: "Sí, pero complicado",
      timeToHelsinki: "1h",
      good: "Naturaleza + BBQ al aire libre + Sauna",
      bad: "Caro",
      link: "https://www.airbnb.co.kr/rooms/1190543962899825319?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "7.avif"
    },
    {
      id: 8,
      name: "Casa completa en Espoo, Finlandia (naturaleza)",
      cost: "€900",
      costBreakdown: "€820 + €80 (€10 por persona)",
      region: "Espoo",
      transport: "Sí, pero complicado",
      timeToHelsinki: "1h",
      good: "Naturaleza + BBQ al aire libre",
      bad: "Caro",
      link: "https://www.airbnb.co.kr/rooms/1240981931923036916?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "8.avif"
    },
    {
      id: 9,
      name: "Villa completa en Kypäri, Finlandia",
      cost: "€970",
      costBreakdown: "€970 total",
      region: "Kypäri",
      transport: "Sin transporte público (36min en coche)",
      timeToHelsinki: "36min en coche",
      good: "Casa grande",
      bad: "Caro + Se requiere coche",
      link: "https://www.airbnb.co.kr/rooms/657625381223499931?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "9.avif"
    },
    {
      id: 10,
      name: "Condominio completo en Helsinki, Finlandia",
      cost: "€1200",
      costBreakdown: "€1200 total",
      region: "Helsinki",
      transport: "Excelente",
      timeToHelsinki: "Centro de la ciudad",
      good: "Centro de Helsinki + Transporte conveniente",
      bad: "Caro",
      link: "https://www.airbnb.co.kr/rooms/710819953484653387?check_in=2025-11-27&check_out=2025-12-01&guests=1&adults=7&s=67&unique_share_id=f6dae256-4814-4acc-9c53-c848c7e736fd",
      img: "10.jpeg"
    }
  ],
  fi: [
    {
      id: 1,
      name: "Yksityishuone talossa, Vantaa, Suomi",
      cost: "€875",
      costBreakdown: "€875 yhteensä",
      region: "Vantaa",
      transport: "Kyllä, mutta monimutkainen",
      timeToHelsinki: "1h",
      good: "Paljon vuoteita + Halpa",
      bad: "Meidän täytyy asua omistajan kanssa",
      link: "https://www.airbnb.co.kr/rooms/10304791?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "1.avif"
    },
    {
      id: 2,
      name: "Koko talo, Espoo, Suomi",
      cost: "€730",
      costBreakdown: "€730 yhteensä",
      region: "Espoon ja Helsingin välillä",
      transport: "Ihan ok",
      timeToHelsinki: "1h",
      good: "1 sohva + 2 parivuodetta + 2 super single -vuodetta",
      bad: "",
      link: "https://www.airbnb.co.kr/rooms/1055966006652479049?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "2.avif"
    },
    {
      id: 3,
      name: "Koko mökki, Lohja, Suomi",
      cost: "€715",
      costBreakdown: "€635 + €80 (€10 per henkilö)",
      region: "Lohja",
      transport: "Ei julkista liikennettä",
      timeToHelsinki: "N/A",
      good: "Vene ja järvi",
      bad: "Ei juoksevaa vettä (kaivo) + Ei Wi-Fi:ä + Ulkovessa",
      link: "https://www.airbnb.co.kr/rooms/35242538?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "3.avif"
    },
    {
      id: 4,
      name: "Koko mökki, Inkoo, Suomi",
      cost: "€754",
      costBreakdown: "€754 yhteensä",
      region: "Inkoo",
      transport: "Ei julkista liikennettä",
      timeToHelsinki: "N/A",
      good: "Yleisesti hyvä",
      bad: "Kuljetushaasteet",
      link: "https://www.airbnb.co.kr/rooms/612009176188095822?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "4.avif"
    },
    {
      id: 5,
      name: "Koko talo, Espoo, Suomi",
      cost: "€675",
      costBreakdown: "€675 yhteensä",
      region: "Espoo",
      transport: "Kyllä, mutta monimutkainen",
      timeToHelsinki: "1h",
      good: "Halpa",
      bad: "Puolet ihmisistä joutuu nukkumaan sohvalla",
      link: "https://www.airbnb.co.kr/rooms/1408786054005263055?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "5.avif"
    },
    {
      id: 6,
      name: "Koko asunto, Vantaa, Suomi",
      cost: "€477",
      costBreakdown: "€477 yhteensä",
      region: "Vantaa",
      transport: "Erittäin hyvä",
      timeToHelsinki: "35min",
      good: "Halpa + Lähellä Helsinkiä",
      bad: "Yhteinen sauna + Kaupunkialue",
      link: "https://www.airbnb.co.kr/rooms/1523754978826325834?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "6.avif"
    },
    {
      id: 7,
      name: "Koko talo, Espoo, Suomi (saunalla)",
      cost: "€880",
      costBreakdown: "€710 + €80 (€10 per henkilö) + €80 sauna",
      region: "Espoo",
      transport: "Kyllä, mutta monimutkainen",
      timeToHelsinki: "1h",
      good: "Luonto + Ulkogrilli + Sauna",
      bad: "Kallis",
      link: "https://www.airbnb.co.kr/rooms/1190543962899825319?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "7.avif"
    },
    {
      id: 8,
      name: "Koko talo, Espoo, Suomi (luonto)",
      cost: "€900",
      costBreakdown: "€820 + €80 (€10 per henkilö)",
      region: "Espoo",
      transport: "Kyllä, mutta monimutkainen",
      timeToHelsinki: "1h",
      good: "Luonto + Ulkogrilli",
      bad: "Kallis",
      link: "https://www.airbnb.co.kr/rooms/1240981931923036916?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "8.avif"
    },
    {
      id: 9,
      name: "Koko huvila, Kypäri, Suomi",
      cost: "€970",
      costBreakdown: "€970 yhteensä",
      region: "Kypäri",
      transport: "Ei julkista liikennettä (36min autolla)",
      timeToHelsinki: "36min autolla",
      good: "Iso talo",
      bad: "Kallis + Auto tarvitaan",
      link: "https://www.airbnb.co.kr/rooms/657625381223499931?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "9.avif"
    },
    {
      id: 10,
      name: "Koko asunto, Helsinki, Suomi",
      cost: "€1200",
      costBreakdown: "€1200 yhteensä",
      region: "Helsinki",
      transport: "Erinomainen",
      timeToHelsinki: "Kaupungin keskusta",
      good: "Helsingin keskusta + Hyvät kulkuyhteydet",
      bad: "Kallis",
      link: "https://www.airbnb.co.kr/rooms/710819953484653387?check_in=2025-11-27&check_out=2025-12-01&guests=1&adults=7&s=67&unique_share_id=f6dae256-4814-4acc-9c53-c848c7e736fd",
      img: "10.jpeg"
    }
  ],
  fr: [
    {
      id: 1,
      name: "Chambre privée dans une maison à Vantaa, Finlande",
      cost: "€875",
      costBreakdown: "€875 total",
      region: "Vantaa",
      transport: "Oui mais compliqué",
      timeToHelsinki: "1h",
      good: "Beaucoup de lits + Bon marché",
      bad: "Nous devons vivre avec le propriétaire",
      link: "https://www.airbnb.co.kr/rooms/10304791?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "1.avif"
    },
    {
      id: 2,
      name: "Maison entière à Espoo, Finlande",
      cost: "€730",
      costBreakdown: "€730 total",
      region: "Entre Espoo et Helsinki",
      transport: "C'est correct",
      timeToHelsinki: "1h",
      good: "1 canapé + 2 lits doubles + 2 lits simples extra-larges",
      bad: "",
      link: "https://www.airbnb.co.kr/rooms/1055966006652479049?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "2.avif"
    },
    {
      id: 3,
      name: "Chalet entier à Lohja, Finlande",
      cost: "€715",
      costBreakdown: "€635 + €80 (€10 par personne)",
      region: "Lohja",
      transport: "Pas de transport public",
      timeToHelsinki: "N/A",
      good: "A un bateau avec un lac",
      bad: "Pas d'eau courante (puits) + Pas de Wi-Fi + Toilettes extérieures",
      link: "https://www.airbnb.co.kr/rooms/35242538?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "3.avif"
    },
    {
      id: 4,
      name: "Chalet entier à Ingå, Finlande",
      cost: "€754",
      costBreakdown: "€754 total",
      region: "Ingå",
      transport: "Pas de transport public",
      timeToHelsinki: "N/A",
      good: "Globalement bon",
      bad: "Difficulté de transport",
      link: "https://www.airbnb.co.kr/rooms/612009176188095822?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "4.avif"
    },
    {
      id: 5,
      name: "Maison entière à Espoo, Finlande",
      cost: "€675",
      costBreakdown: "€675 total",
      region: "Espoo",
      transport: "Oui mais compliqué",
      timeToHelsinki: "1h",
      good: "Bon marché",
      bad: "La moitié des personnes doivent dormir sur un canapé",
      link: "https://www.airbnb.co.kr/rooms/1408786054005263055?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "5.avif"
    },
    {
      id: 6,
      name: "Appartement entier à Vantaa, Finlande",
      cost: "€477",
      costBreakdown: "€477 total",
      region: "Vantaa",
      transport: "Très bon",
      timeToHelsinki: "35min",
      good: "Bon marché + Proche d'Helsinki",
      bad: "Sauna partagé + Zone urbaine",
      link: "https://www.airbnb.co.kr/rooms/1523754978826325834?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "6.avif"
    },
    {
      id: 7,
      name: "Maison entière à Espoo, Finlande (avec sauna)",
      cost: "€880",
      costBreakdown: "€710 + €80 (€10 par personne) + €80 pour sauna",
      region: "Espoo",
      transport: "Oui mais compliqué",
      timeToHelsinki: "1h",
      good: "Nature + BBQ extérieur + Sauna",
      bad: "Cher",
      link: "https://www.airbnb.co.kr/rooms/1190543962899825319?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "7.avif"
    },
    {
      id: 8,
      name: "Maison entière à Espoo, Finlande (nature)",
      cost: "€900",
      costBreakdown: "€820 + €80 (€10 par personne)",
      region: "Espoo",
      transport: "Oui mais compliqué",
      timeToHelsinki: "1h",
      good: "Nature + BBQ extérieur",
      bad: "Cher",
      link: "https://www.airbnb.co.kr/rooms/1240981931923036916?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "8.avif"
    },
    {
      id: 9,
      name: "Villa entière à Kypäri, Finlande",
      cost: "€970",
      costBreakdown: "€970 total",
      region: "Kypäri",
      transport: "Pas de transport public (36min en voiture)",
      timeToHelsinki: "36min en voiture",
      good: "Grande maison",
      bad: "Cher + Voiture nécessaire",
      link: "https://www.airbnb.co.kr/rooms/657625381223499931?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "9.avif"
    },
    {
      id: 10,
      name: "Appartement entier à Helsinki, Finlande",
      cost: "€1200",
      costBreakdown: "€1200 total",
      region: "Helsinki",
      transport: "Excellent",
      timeToHelsinki: "Centre-ville",
      good: "Centre d'Helsinki + Transport pratique",
      bad: "Cher",
      link: "https://www.airbnb.co.kr/rooms/710819953484653387?check_in=2025-11-27&check_out=2025-12-01&guests=1&adults=7&s=67&unique_share_id=f6dae256-4814-4acc-9c53-c848c7e736fd",
      img: "10.jpeg"
    }
  ],
  ko: [
    {
      id: 1,
      name: "반타, 핀란드의 집의 개인실",
      cost: "€875",
      costBreakdown: "€875 총",
      region: "반타",
      transport: "있지만 복잡함",
      timeToHelsinki: "1시간",
      good: "침대가 많음 + 저렴함",
      bad: "집주인과 함께 살아야 함",
      link: "https://www.airbnb.co.kr/rooms/10304791?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "1.avif"
    },
    {
      id: 2,
      name: "에스푸, 핀란드의 집 전체",
      cost: "€730",
      costBreakdown: "€730 총",
      region: "에스푸와 헬싱키 사이",
      transport: "괜찮음",
      timeToHelsinki: "1시간",
      good: "소파 1개 + 더블 침대 2개 + 슈퍼 싱글 침대 2개",
      bad: "",
      link: "https://www.airbnb.co.kr/rooms/1055966006652479049?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "2.avif"
    },
    {
      id: 3,
      name: "Lohja, 핀란드의 별장 전체",
      cost: "€715",
      costBreakdown: "€635 + €80 (1인당 €10)",
      region: "로흐야",
      transport: "대중교통 없음",
      timeToHelsinki: "N/A",
      good: "호수가 있는 보트 보유",
      bad: "수돗물 없음 (우물 있음) + Wi-Fi 없음 + 실외 화장실",
      link: "https://www.airbnb.co.kr/rooms/35242538?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "3.avif"
    },
    {
      id: 4,
      name: "Ingå, 핀란드의 별장 전체",
      cost: "€754",
      costBreakdown: "€754 총",
      region: "잉고",
      transport: "대중교통 없음",
      timeToHelsinki: "N/A",
      good: "전반적으로 좋음",
      bad: "교통 불편",
      link: "https://www.airbnb.co.kr/rooms/612009176188095822?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "4.avif"
    },
    {
      id: 5,
      name: "에스푸, 핀란드의 집 전체",
      cost: "€675",
      costBreakdown: "€675 총",
      region: "에스푸",
      transport: "있지만 복잡함",
      timeToHelsinki: "1시간",
      good: "저렴함",
      bad: "절반의 사람들이 소파에서 자야 함",
      link: "https://www.airbnb.co.kr/rooms/1408786054005263055?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "5.avif"
    },
    {
      id: 6,
      name: "반타, 핀란드의 공동 주택 전체",
      cost: "€477",
      costBreakdown: "€477 총",
      region: "반타",
      transport: "매우 좋음",
      timeToHelsinki: "35분",
      good: "저렴함 + 헬싱키와 가까움",
      bad: "공용 사우나 + 도심 지역",
      link: "https://www.airbnb.co.kr/rooms/1523754978826325834?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "6.avif"
    },
    {
      id: 7,
      name: "에스푸, 핀란드의 집 전체 (사우나 포함)",
      cost: "€880",
      costBreakdown: "€710 + €80 (1인당 €10) + €80 사우나",
      region: "에스푸",
      transport: "있지만 복잡함",
      timeToHelsinki: "1시간",
      good: "자연 + 야외 바베큐 + 사우나",
      bad: "비쌈",
      link: "https://www.airbnb.co.kr/rooms/1190543962899825319?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "7.avif"
    },
    {
      id: 8,
      name: "에스푸, 핀란드의 집 전체 (자연)",
      cost: "€900",
      costBreakdown: "€820 + €80 (1인당 €10)",
      region: "에스푸",
      transport: "있지만 복잡함",
      timeToHelsinki: "1시간",
      good: "자연 + 야외 바베큐",
      bad: "비쌈",
      link: "https://www.airbnb.co.kr/rooms/1240981931923036916?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "8.avif"
    },
    {
      id: 9,
      name: "Kypäri, 핀란드의 저택 전체",
      cost: "€970",
      costBreakdown: "€970 총",
      region: "퀴파리",
      transport: "대중교통 없음 (차로 36분)",
      timeToHelsinki: "차로 36분",
      good: "큰 집",
      bad: "비쌈 + 차량 필요",
      link: "https://www.airbnb.co.kr/rooms/657625381223499931?adults=7&check_in=2025-11-27&check_out=2025-12-01",
      img: "9.avif"
    },
    {
      id: 10,
      name: "헬싱키(Helsinki), 핀란드의 공동 주택 전체",
      cost: "€1200",
      costBreakdown: "",
      region: "헬싱키",
      transport: "",
      timeToHelsinki: "",
      good: "헬싱키 중심부 + 편리한 교통",
      bad: "비쌈",
      link: "https://www.airbnb.co.kr/rooms/710819953484653387?check_in=2025-11-27&check_out=2025-12-01&guests=1&adults=7&s=67&unique_share_id=f6dae256-4814-4acc-9c53-c848c7e736fd",
      img: "10.jpeg"
    }
  ]
};

// Get listings for current language
const listings = listingsData[lang] || listingsData.en;

// === Render ===
const container = document.getElementById("listings");
const t = translations[lang] || translations.en;

listings.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";

  // Format transport info with time
  const transportInfo = item.timeToHelsinki !== "N/A" 
    ? `${item.transport} / ${item.timeToHelsinki}`
    : item.transport;

  card.innerHTML = `
    <img src="${item.img}" alt="${item.name}" 
         onerror="this.src='https://via.placeholder.com/640x400?text=No+Image'">
    <div class="card-body">
      <h2>#${item.id}. ${item.name}</h2>
      <div class="meta"><strong>${item.cost}</strong> <span class="cost-breakdown">(${item.costBreakdown})</span></div>
      <div class="meta"><strong>${t.region}:</strong> ${item.region}</div>
      <div class="meta"><strong>${t.transport}:</strong> ${transportInfo}</div>
      <div class="proscons">
        ${item.good ? `<h4>${t.good}</h4><ul class="pros">${item.good.split('+').map(g => `<li>${g.trim()}</li>`).join('')}</ul>` : ""}
        ${item.bad ? `<h4>${t.bad}</h4><ul class="cons">${item.bad.split('+').map(b => `<li>${b.trim()}</li>`).join('')}</ul>` : ""}
      </div>
    </div>
    <div class="card-footer">
      <a href="${item.link}" target="_blank">${t.view}</a>
    </div>
  `;
  container.appendChild(card);
});

// === Language Switcher Function ===
function changeLanguage(newLang) {
  if (translations[newLang] && listingsData[newLang]) {
    selectedLanguage = newLang;
    const listings = listingsData[newLang];
    const t = translations[newLang];
    
    // Clear and re-render
    container.innerHTML = '';
    
    listings.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      const transportInfo = item.timeToHelsinki !== "N/A" 
        ? `${item.transport} / ${item.timeToHelsinki}`
        : item.transport;
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" 
             onerror="this.src='https://via.placeholder.com/640x400?text=No+Image'">
        <div class="card-body">
          <h2>#${item.id}. ${item.name}</h2>
          <div class="meta"><strong>${item.cost}</strong> <span class="cost-breakdown">(${item.costBreakdown})</span></div>
          <div class="meta"><strong>${t.region}:</strong> ${item.region}</div>
          <div class="meta"><strong>${t.transport}:</strong> ${transportInfo}</div>
          <div class="proscons">
            ${item.good ? `<h4>${t.good}</h4><ul class="pros">${item.good.split('+').map(g => `<li>${g.trim()}</li>`).join('')}</ul>` : ""}
            ${item.bad ? `<h4>${t.bad}</h4><ul class="cons">${item.bad.split('+').map(b => `<li>${b.trim()}</li>`).join('')}</ul>` : ""}
          </div>
        </div>
        <div class="card-footer">
          <a href="${item.link}" target="_blank">${t.view}</a>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

// Make changeLanguage available globally
window.changeLanguage = changeLanguage