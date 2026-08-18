// Edit this file to make the app yours.
// IDs should use simple lowercase letters/numbers only, and expenses.json
// must use the same IDs in paidBy and split.
window.TRIP_SPLIT_CONFIG = {
  tripName: "Group Trip",
  appLabel: "Split",
  baseCurrency: "KRW",
  defaultCurrency: "KRW",
  defaultPerson: "you",
  settlementHub: "you",

  // Set to "" to disable the edit/delete password prompt.
  editPassword: "1234",

  people: [
    { id: "you", name: "You", tone: "#c4502a" },
    { id: "min", name: "Min", tone: "#7a8c5c" },
    { id: "alex", name: "Alex", tone: "#4d6b85" },
  ],

  currencies: [
    { code: "KRW", symbol: "₩", label: "won", decimals: 0 },
    { code: "USD", symbol: "$", label: "dollar", decimals: 2 },
    { code: "EUR", symbol: "€", label: "euro", decimals: 2 },
  ],

  // Fallback values used while online exchange rates are loading or unavailable.
  // Values are expressed as "1 currency unit equals how many baseCurrency units".
  fixedRates: { KRW: 1, USD: 1500, EUR: 1715 },

  // Keep this empty for a clean app. Put shared demo rows in expenses.sample.json.
  seedExpenses: [],
};

window.APP_DEFAULTS = {
  "me": "you",
  "bg": "cream",
  "displayCcy": "KRW"
};
