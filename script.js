// Données du menu
const menuItems = [
  { name: "Salade César", description: "Laitue romaine, croûtons, parmesan", price: "$8.99", category: "entrée" },
  { name: "Steak Frites", description: "Steak grillé avec frites maison", price: "$19.99", category: "plat principal" },
  { name: "Tiramisu", description: "Dessert italien au café", price: "$6.99", category: "dessert" },
  { name: "Soupe à l'oignon", description: "Soupe traditionnelle française", price: "$7.99", category: "entrée" },
  { name: "Poulet rôti", description: "Poulet rôti avec légumes de saison", price: "$15.99", category: "plat principal" },
  { name: "Mousse au chocolat", description: "Mousse légère au chocolat noir", price: "$5.99", category: "dessert" },
];

// Éléments du DOM
const searchInput = document.getElementById("search-input");
const menuSection = document.querySelector(".menu-items");
const noResultsMessage = document.getElementById("no-results");

// Fonction pour afficher les éléments du menu
function displayMenuItems(filterText = "", category = "all") {
  menuSection.innerHTML = ""; // Vider la section avant d'afficher les nouveaux éléments
  let hasResults = false;

  menuItems.forEach((item) => {
    const matchesSearch = item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                         item.description.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;

    if (matchesSearch && matchesCategory) {
      const itemElement = document.createElement("div");
      itemElement.classList.add("menu-item");
      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">${item.price}</p>
      `;
      menuSection.appendChild(itemElement);
      hasResults = true;
    }
  });

  // Afficher un message si aucun résultat n'est trouvé
  noResultsMessage.classList.toggle("hidden", hasResults);
}

// Gestion des clics sur les boutons de filtrage
document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    displayMenuItems(searchInput.value, category);
  });
});

// Gestion de la saisie dans le champ de recherche
searchInput.addEventListener("input", () => {
  const category = document.querySelector(".filters button.active")?.getAttribute("data-category") || "all";
  displayMenuItems(searchInput.value, category);
});

// Afficher tous les éléments au chargement de la page
window.onload = () => displayMenuItems();