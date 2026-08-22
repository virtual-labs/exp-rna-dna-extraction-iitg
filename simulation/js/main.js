document.addEventListener('DOMContentLoaded', () => {
    // 8-step Viral RNA/DNA Extraction sequence configuration
    const steps = [
        {
            src: './images/Step1.mp4',
            caption: 'Step 1: Add 200 μL of sample (serum, plasma, or cell culture supernatant) to a microcentrifuge tube and add 25 μL Proteinase K.'
        },
        {
            src: './images/Step2.mp4',
            caption: 'Step 2: Add 200 μL Lysis Buffer containing chaotropic salts and detergents, then mix thoroughly by vortexing.'
        },
        {
            src: './images/Step3.mp4',
            caption: 'Step 3: Incubate the sample tube at 56 °C for 15 minutes to allow complete chemical lysis and nuclease inactivation.'
        },
        {
            src: './images/Step4.mp4',
            caption: 'Step 4: Add 250 μL 100% ethanol to the tube, mix by vortexing, and incubate for 5 minutes at room temperature.'
        },
        {
            src: './images/Step5.mp4',
            caption: 'Step 5: Load the lysate into the Viral Spin Column in a collection tube and centrifuge at 6800 × g for 1 minute to bind nucleic acids.'
        },
        {
            src: './images/Step6.mp4',
            caption: 'Step 6: Wash the column with 500 μL Wash Buffer (WII) and centrifuge at 6800 × g for 1 minute. Discard flow-through and repeat wash.'
        },
        {
            src: './images/Step7.mp4',
            caption: 'Step 7: Centrifuge at max speed for 1 minute to remove residual buffer, add 10-50 μL nuclease-free water, incubate for 1 minute, and centrifuge to elute.'
        },
        {
            src: './images/Step8.mp4',
            caption: 'Step 8: Load a small volume of the eluted RNA/DNA sample on the NanoDrop spectrophotometer to measure concentration and purity.'
        }
    ];

    let currentIndex = 0;

    const sliderVideo = document.getElementById('sliderVideo');
    const slideCaption = document.getElementById('slideCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepCounter = document.getElementById('stepCounter');
    const progressBar = document.getElementById('progressBar');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize dot indicators
    function initIndicators() {
        indicatorsContainer.innerHTML = '';
        steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => jumpToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    // Update the layout and slide content
    function updateSlide() {
        const step = steps[currentIndex];

        // Apply fade-out animation to the media element
        sliderVideo.classList.add('fade-out');

        setTimeout(() => {
            // Update source and load video
            sliderVideo.src = step.src;
            sliderVideo.load();

            // Wait for video data to load to prevent visual stutter/grey backgrounds
            sliderVideo.onloadeddata = () => {
                sliderVideo.classList.remove('fade-out');
                // Automatically play the video (with volume muted to prevent browser blocks)
                sliderVideo.play().catch(e => console.log('Playback prevented by browser policies:', e));
            };

            // Update caption content
            slideCaption.style.animation = 'none';
            slideCaption.offsetHeight; // trigger reflow
            slideCaption.style.animation = null;
            slideCaption.textContent = step.caption;

            // Update text counter and progress bar
            stepCounter.textContent = `Step ${currentIndex + 1} of ${steps.length}`;
            const progressPercentage = ((currentIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Update dot indicators states
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Enable/disable navigation buttons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === steps.length - 1;

        }, 250); // Matches the CSS transition duration
    }

    function goToNext() {
        if (currentIndex < steps.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    // Handle video end to automatically trigger next step (optional/UX polish)
    sliderVideo.addEventListener('ended', () => {
        if (currentIndex < steps.length - 1) {
            goToNext();
        }
    });

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    function jumpToSlide(index) {
        if (index !== currentIndex && index >= 0 && index < steps.length) {
            currentIndex = index;
            updateSlide();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Initial setup
    initIndicators();
    updateSlide();
});
