
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section');
        observer.observe(section);
    });

    // Setup smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
// Tabbed Content
    const symptomsTab = document.getElementById('symptoms-tab');
    const causesTab = document.getElementById('causes-tab');
    const symptomsContent = document.getElementById('symptoms-content');
    const causesContent = document.getElementById('causes-content');

    if (symptomsTab && causesTab) {
        symptomsTab.addEventListener('click', function() {
            symptomsTab.classList.add('active', 'text-lavender-600', 'border-lavender-500');
            symptomsTab.classList.remove('text-sage-600', 'hover:text-sage-800');
            causesTab.classList.remove('active', 'text-lavender-600', 'border-lavender-500');
            causesTab.classList.add('text-sage-600', 'hover:text-sage-800');
            symptomsContent.classList.remove('hidden');
            symptomsContent.classList.add('active');
            causesContent.classList.add('hidden');
            causesContent.classList.remove('active');
        });

        causesTab.addEventListener('click', function() {
            causesTab.classList.add('active', 'text-lavender-600', 'border-lavender-500');
            causesTab.classList.remove('text-sage-600', 'hover:text-sage-800');
            symptomsTab.classList.remove('active', 'text-lavender-600', 'border-lavender-500');
            symptomsTab.classList.add('text-sage-600', 'hover:text-sage-800');
            causesContent.classList.remove('hidden');
            causesContent.classList.add('active');
            symptomsContent.classList.add('hidden');
            symptomsContent.classList.remove('active');
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            if (this.classList.contains('active')) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.classList.add('hidden');
                }, 300);
            }
        });
    });

    // Self Assessment Form
    const assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const resultContainer = document.getElementById('assessment-result');
            const resultTitle = document.getElementById('result-title');
            const resultContent = document.getElementById('result-content');
            const resultAction = document.getElementById('result-action');
            
            // Get answers
            const answers = {
                q1: document.querySelector('input[name="q1"]:checked')?.value,
                q2: document.querySelector('input[name="q2"]:checked')?.value,
                q3: document.querySelector('input[name="q3"]:checked')?.value,
                q4: document.querySelector('input[name="q4"]:checked')?.value,
                q5: document.querySelector('input[name="q5"]:checked')?.value
            };
            
            // Simple scoring logic
            let score = 0;
            Object.values(answers).forEach(answer => {
                if (!answer) return;
                if (answer === 'd') score += 3;
                else if (answer === 'c') score += 2;
                else if (answer === 'b') score += 1;
            });
            
            // Determine result
            if (score >= 10) {
                resultTitle.textContent = 'Segera Konsultasi Dokter';
                resultContent.textContent = 'Berdasarkan jawaban Anda, gejala yang Anda alami mungkin memerlukan evaluasi medis. Disarankan untuk segera berkonsultasi dengan dokter kandungan atau spesialis kulit untuk pemeriksaan lebih lanjut.';
                resultContainer.className = 'mt-8 p-6 rounded-lg bg-peach-50 border-l-4 border-peach-500';
                resultAction.innerHTML = `
                    <a href="#" class="inline-block bg-peach-500 hover:bg-peach-600 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center">
                        <i data-feather="calendar" class="mr-2"></i> Buat Janji Dokter
                    </a>
                `;
            } else if (score >= 5) {
                resultTitle.textContent = 'Perlu Pemantauan';
                resultContent.textContent = 'Gejala Anda mungkin dapat diatasi dengan perawatan mandiri, namun perlu dipantau perkembangannya. Jika gejala tidak membaik dalam 1-2 minggu atau memburuk, segera konsultasikan dengan dokter.';
                resultContainer.className = 'mt-8 p-6 rounded-lg bg-lavender-50 border-l-4 border-lavender-500';
                resultAction.innerHTML = `
                    <a href="#prevention" class="inline-block bg-lavender-500 hover:bg-lavender-600 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center">
                        <i data-feather="shield" class="mr-2"></i> Lihat Tips Pencegahan
                    </a>
                `;
            } else {
                resultTitle.textContent = 'Gejala Ringan';
                resultContent.textContent = 'Gejala yang Anda alami tampaknya ringan dan mungkin dapat diatasi dengan perawatan mandiri. Terapkan langkah-langkah pencegahan dan pantau perkembangannya. Jika gejala menetap atau memburuk, pertimbangkan untuk berkonsultasi dengan dokter.';
                resultContainer.className = 'mt-8 p-6 rounded-lg bg-sage-50 border-l-4 border-sage-500';
                resultAction.innerHTML = `
                    <a href="#prevention" class="inline-block bg-sage-500 hover:bg-sage-600 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center">
                        <i data-feather="shield" class="mr-2"></i> Lihat Tips Pencegahan
                    </a>
                `;
            }
            
            resultContainer.classList.remove('hidden');
            feather.replace();
            
            // Scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
                backToTopButton.classList.remove('opacity-0', 'invisible');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Handle shadow DOM links in navigation
    const navComponent = document.querySelector('custom-navigation');
    if (navComponent) {
        navComponent.shadowRoot.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if open
                    const mobileMenu = navComponent.shadowRoot.getElementById('mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('open');
                    }
                }
            });
        });
    }
});