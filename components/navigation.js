class CustomNavigation extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                nav {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: rgba(241, 247, 237, 0.95);
                    backdrop-filter: blur(8px);
                    border-bottom: 1px solid #d1d5db;
                }

                .container {
                    max-width: 1200px;
                    margin: auto;
                    padding: 16px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .brand {
                    font-size: 24px;
                    font-weight: 700;
                    color: #557340;
                    text-decoration: none;
                }

                .menu {
                    display: flex;
                    gap: 24px;
                }

                .menu a {
                    text-decoration: none;
                    color: #4b5563;
                    font-weight: 500;
                    position: relative;
                }

                .menu a::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: -4px;
                    width: 0;
                    height: 2px;
                    background: #88ab6a;
                    transition: width 0.3s ease;
                }

                .menu a:hover::after {
                    width: 100%;
                }

                /* MOBILE */
                .toggle {
                    display: none;
                    cursor: pointer;
                    font-size: 22px;
                }

                @media (max-width: 768px) {
                    .menu {
                        display: none;
                        flex-direction: column;
                        padding: 16px;
                        border-top: 1px solid #e5e7eb;
                    }

                    .menu.open {
                        display: flex;
                    }

                    .toggle {
                        display: block;
                    }
                }
            </style>

            <nav>
                <div class="container">
                    <a href="#dashboard" class="brand">HyTalks</a>
                    <div class="toggle" id="toggle">☰</div>
                    <div class="menu" id="menu">
                        <a href="#understanding">Pengertian</a>
                        <a href="#symptoms">Gejala</a>
                        <a href="#causes">Penyebab</a>
                        <a href="#prevention">Pencegahan</a>
                    </div>
                </div>
            </nav>
        `;

        const toggle = this.shadowRoot.getElementById('toggle');
        const menu = this.shadowRoot.getElementById('menu');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
        });
    }
}

customElements.define('custom-navigation', CustomNavigation);

