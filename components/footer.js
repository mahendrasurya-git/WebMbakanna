class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #f1f7ed;
          color: #384d2e;
          padding: 2rem 1rem;
          border-top: 1px solid #e0e8d9;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #557340;
          margin-bottom: 1rem;
        }
        
        .footer-links h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #557340;
        }
        
        .footer-links ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: #384d2e;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #88ab6a;
        }
        
        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e8d9;
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <footer>
        <div class="footer-container">
          <div class="footer-about">
            <div class="footer-logo">HyTalks</div>
            <p>Platform edukasi kesehatan wanita untuk pemahaman dan penanganan pruritus vulvae.</p>
          </div>
          
          <div class="footer-links">
            <h3>Informasi</h3>
            <ul>
              <li><a href="#understanding">Pengertian</a></li>
              <li><a href="#symptoms">Gejala</a></li>
              <li><a href="#causes">Penyebab</a></li>
              <li><a href="#prevention">Pencegahan</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h3>Bantuan</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kontak</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Mahend. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}


customElements.define('custom-footer', CustomFooter);
