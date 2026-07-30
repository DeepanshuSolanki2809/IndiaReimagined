/* ==========================================================
   India Reimagined
   dataLoader.js
   Load JSON data into pages
========================================================== */

class DataLoader {

    static async load(file) {

        try {

            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(`Unable to load ${file}`);
            }

            return await response.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    }

    static renderHero(data) {

        const hero = document.querySelector("[data-hero]");

        if (!hero || !data) return;

        hero.innerHTML = `
            <div class="container">
                <h1>${data.title}</h1>
                <p>${data.subtitle}</p>
            </div>
        `;

    }

    static renderCards(containerSelector, cards) {

        const container = document.querySelector(containerSelector);

        if (!container || !cards) return;

        container.innerHTML = "";

        cards.forEach(card => {

            container.innerHTML += `
                <div class="card">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            `;

        });

    }

}
