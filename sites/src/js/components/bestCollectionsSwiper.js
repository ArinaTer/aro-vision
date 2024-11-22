import { isMobileOrTablet } from "./utils.js";

export function bestCollectionsSwiper() {
    const parentWindow = window.parent;

    const hand3DElements = document.querySelectorAll(".best-collections__3d-visual-draggable-hand");


    hand3DElements.forEach(hand3D => {
        if (hand3D) {
            const hideHand = () => {
                hand3D.classList.add("hide");
            };

            const addHideClassAfterDelay = () => {
                setTimeout(hideHand, 5000);
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        addHideClassAfterDelay();
                        observer.disconnect();
                    }
                });
            });

            observer.observe(hand3D);

            hand3D.addEventListener("click", hideHand);
            hand3D.addEventListener("touchstart", hideHand);
        }
    });

    if (window.innerWidth < 767.98) {
        document.querySelectorAll('.popup-title-desc h4').forEach(function (element) {
            element.textContent = 'Visit project';
        });
    }

    const options = {
        threshold: 0
    };

    const handle3DCollectionSwiper = (swiperElement) => {
        const hasVideo = swiperElement.querySelector('video') !== null;

        if (hasVideo) {
            swiperElement.classList.add('best-collections__swiper-video');
        }

        const swiperConfig = {
            modules: [Pagination, Navigation],
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: true,
            speed: 1500,
            navigation: {
                nextEl: ".visual-collections__swiper .best-collections__swiper-btn-next",
                prevEl: ".visual-collections__swiper .best-collections__swiper-btn-prev",
            },

            pagination: {
                el: swiperElement.querySelector('.best-collections__swiper-pagination'),
                type: 'progressbar',
                clickable: true,
            },
            on: {
                init: function () {
                    makePaginationClickable(this, swiperElement);
                    retryUpdateProgressBar(this, swiperElement);
                },
                slideChange: function () {
                    retryUpdateProgressBar(this, swiperElement);
                    updatePopupTitleAndVisibility(this);
                },
                progress: function () {
                    retryUpdateProgressBar(this, swiperElement);
                },
            },
            breakpoints: {
                992: {
                    spaceBetween: 40,
                },
            },
        };

        if (!hasVideo) {
            // swiperConfig.modules.push(Autoplay);
            // swiperConfig.autoplay = {
            //     delay: 2500,
            //     disableOnInteraction: false,
            // };
            swiperConfig.on.autoplayTimeLeft = function (s, time, progress) {
                const bullets = swiperElement.querySelectorAll(".swiper-pagination-bullet");
                bullets.forEach((bullet) => {
                    if (bullet.classList.contains('swiper-pagination-bullet-active')) {
                        const progressSpan = bullet.querySelector('.autoplay-progress');
                        if (progressSpan) {
                            progressSpan.style.width = `${(1 - progress) * 100}%`;
                        }
                    }
                });
            };
        }

        new Swiper(swiperElement, swiperConfig);
    };

    const handleRegularSwiper = (swiperElement) => {
        const hasVideo = swiperElement.querySelector('video') !== null;
    
        if (hasVideo) {
            swiperElement.classList.add('best-collections__swiper-video');
        }
    
        const swiperConfig = {
            modules: [Pagination, EffectFade, Navigation],
            spaceBetween: 5,
            centeredSlides: true,
            slidesPerView: 1,
            loop: true,
            speed: 1500,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".best-collections__swiper-btn-next",
                prevEl: ".best-collections__swiper-btn-prev",
            },
            pagination: {
                el: swiperElement.querySelector('.best-collections__swiper-pagination'),
                clickable: true,
                renderBullet: function (index, className) {
                    const bullet = document.createElement('span');
                    bullet.className = 'swiper-pagination-bullet ' + className;
    
                    const progressSpan = document.createElement('span');
                    progressSpan.className = 'autoplay-progress';
    
                    bullet.appendChild(progressSpan);
    
                    return bullet.outerHTML;
                },
            },
            on: {
                init: function () {
                    updatePopupTitleAndVisibility(this);
                },
                slideChange: function () {
                    updatePopupTitleAndVisibility(this);
                },
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.25,
                    spaceBetween: 30,
                },
            },
        };
    
        if (!hasVideo) {
            swiperConfig.modules.push(Autoplay);
            swiperConfig.autoplay = {
                delay: 2500,
                disableOnInteraction: false,
            };
            swiperConfig.on.autoplayTimeLeft = function (s, time, progress) {
                const bullets = swiperElement.querySelectorAll(".swiper-pagination-bullet");
                bullets.forEach((bullet) => {
                    if (bullet.classList.contains('swiper-pagination-bullet-active')) {
                        const progressSpan = bullet.querySelector('.autoplay-progress');
                        if (progressSpan) {
                            progressSpan.style.width = `${(1 - progress) * 100}%`;
                        }
                    }
                });
            };
        } else {
            // Убираем свойства loop и breakpoints, если есть видео
            swiperConfig.loop = false;
            delete swiperConfig.breakpoints;
        }
    
        new Swiper(swiperElement, swiperConfig);
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const swiperElement = entry.target;
                const is3DCollection = swiperElement.classList.contains('visual-collections__swiper');

                if (is3DCollection) {
                    handle3DCollectionSwiper(swiperElement);
                } else {
                    handleRegularSwiper(swiperElement);
                }

                observer.unobserve(swiperElement);
            }
        });
    };

    const makePaginationClickable = (swiper, swiperElement) => {
        const progressbar = swiperElement.querySelector('.visual-collections__swiper .swiper-pagination');
        progressbar.addEventListener('click', function (e) {
            const progressBarWidth = progressbar.offsetWidth;
            const clickPosition = e.offsetX;
            const newSlideIndex = Math.round((clickPosition / progressBarWidth) * (swiper.slides.length - 1));
            swiper.slideTo(newSlideIndex);
        });
    };

    const updateProgressBar = (swiper, swiperElement) => {
        const progressbarFill = swiperElement.querySelector('.swiper-pagination-progressbar-fill');

        if (progressbarFill) {
            let progress;

            if (swiper.isEnd) {
                progress = 100;
            } else {
                progress = ((swiper.activeIndex / (swiper.slides.length - 1)) * 90) + 10; // 10% is the minimum width
            }

            progressbarFill.style.width = `${progress}%`;
        }
    };

    const retryUpdateProgressBar = (swiper, swiperElement, retries = 10) => {
        if (retries <= 0) return;

        const progressbarFill = swiperElement.querySelector('.swiper-pagination-progressbar-fill');
        if (progressbarFill) {
            updateProgressBar(swiper, swiperElement);
        } else {
            setTimeout(() => {
                retryUpdateProgressBar(swiper, swiperElement, retries - 1);
            }, 100);
        }
    };

    const updatePopupTitleAndVisibility = (swiper) => {
        const swiperElement = swiper.el.closest('.best-collections__item');
        if (!swiperElement) return;

        const popupTitles = swiperElement.querySelectorAll('.best-collections__popup-title-list .popup-title-mob');
        const popups = swiperElement.querySelectorAll('.best-collections__swiper-popups .best-collections__popups');

        if (popupTitles.length === 0 || popups.length === 0) return;

        const activeSlide = swiper.slides[swiper.activeIndex];
        const popupId = activeSlide.getAttribute('data-popup-id-mob');

        popupTitles.forEach(title => {
            if (title.getAttribute('data-popup-value-mob') === popupId) {
                title.classList.add('_active');
            } else {
                title.classList.remove('_active');
            }
        });

        popups.forEach(popup => {
            if (popup.getAttribute('data-popup-value-mob') === popupId) {
                popup.classList.add('_active');
            } else {
                popup.classList.remove('_active');
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    const swipers = document.querySelectorAll('.best-collections__swiper.swiper');
    swipers.forEach(swiperElement => {
        observer.observe(swiperElement);
    });

    const hand = document.querySelector(".best-collections__bottom-viewer .best-collections__draggable-hand");
    const viewerContainer = document.querySelector("#viewer");
    const imgElements = document.querySelectorAll('.best-collections__viewer-img');
    const popupElements = document.querySelectorAll('.best-collections__popups');
    const popupTitleElements = document.querySelectorAll('.popup-title-mob');
    const prevButton = document.querySelector('.best-collections__viewer-prev');
    const nextButton = document.querySelector('.best-collections__viewer-next');
    let currentViewer;
    let initialImgSrc;
    let currentIndex = 0; // Индекс текущего активного изображения

    const fullscreenButton = document.querySelector('.viewer-fullscreen');
    const fullscreenBg = document.createElement('div');
    fullscreenBg.classList.add('fullscreen-bg');
    document.body.appendChild(fullscreenBg);

    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            parentWindow.document.body.classList.toggle("fullscreen-viewer-active");
            document.body.style.overflow = "hidden";
            lenisScroll.stop();

            setTimeout(() => {
                document.body.classList.toggle('fullscreen-active');
            }, 500);

            fullscreenBg.classList.add("_active")
            
            setTimeout(() => {
                fullscreenBg.classList.remove("_active")
                document.body.style.overflow = "auto";
                lenisScroll.start();

            }, 600);
        });
    }

    function initializeViewer(imgSrc) {
        if (viewerContainer) {
            if (currentViewer) {
                currentViewer.destroy(); // Очистка предыдущего экземпляра, если он существует
            }
            viewerContainer.innerHTML = ''; // Очистка предыдущего содержимого

            currentViewer = new Viewer({
                container: viewerContainer,
                panorama: imgSrc,
                plugins: [GyroscopePlugin],
                navbar: false,
                mousewheel: false,
                GyroscopePluginConfig: {
                    absolutePosition: true,
                    moveMode: "smooth",
                    touchmove: true,
                },
            });
        }
    }


    function updateActiveImage(index) {
        // Удаление класса _active у всех изображений и popup элементов
        imgElements.forEach(img => img.classList.remove("_active"));
        popupElements.forEach(popup => popup.classList.remove("_active"));
        popupTitleElements.forEach(popup => popup.classList.remove("_active"));


        // Добавление класса _active к текущему изображению и соответствующему popup элементу
        imgElements[index].classList.add("_active");
        const viewerValue = imgElements[index].getAttribute('data-viewer-id');
        setTimeout(() => {
            popupElements.forEach(popup => {
                if (popup.getAttribute('data-viewer-value') === viewerValue) {
                    popup.classList.add("_active");
                }
            });
            popupTitleElements.forEach(popup => {
                if (popup.getAttribute('data-viewer-value') === viewerValue) {
                    popup.classList.add("_active");
                }
            });
        }, 200); // Задержка в миллисекундах (например, 200ms)

        const imgSrc = imgElements[index].getAttribute('src');
        viewerContainer.style.backgroundImage = `url(${imgSrc})`;
        initialImgSrc = imgSrc;

        if (currentViewer) {
            initializeViewer(imgSrc);
        }

        // Обновление прозрачности и активности кнопок
        updateButtonsVisibility(index);
    }

    function updateButtonsVisibility(index) {
        if (index === 0) {
            prevButton.style.opacity = 0.5; // Кнопка prev становится прозрачной
            prevButton.style.pointerEvents = "none"; // Отключение событий указателя
        } else {
            prevButton.style.opacity = 1; // Кнопка prev становится непрозрачной
            prevButton.style.pointerEvents = "auto"; // Включение событий указателя
        }

        if (index === imgElements.length - 1) {
            nextButton.style.opacity = 0.5; // Кнопка next становится прозрачной
            nextButton.style.pointerEvents = "none"; // Отключение событий указателя
        } else {
            nextButton.style.opacity = 1; // Кнопка next становится непрозрачной
            nextButton.style.pointerEvents = "auto"; // Включение событий указателя
        }
    }

    // Вставка первого изображения в контейнер при загрузке страницы
    if (imgElements.length > 0) {
        initialImgSrc = imgElements[0].getAttribute('src');
        viewerContainer.style.backgroundSize = 'cover';
        viewerContainer.style.backgroundImage = `url(${initialImgSrc})`;
        imgElements[0].classList.add("_active"); // Добавление класса _active к первому изображению при загрузке
        updateButtonsVisibility(0);
    }

    // Обработка клика на изображения
    imgElements.forEach((imgElement, index) => {
        imgElement.addEventListener("click", () => {
            currentIndex = index;
            updateActiveImage(currentIndex);
        });
    });

    if (hand) {
        hand.addEventListener("click", () => {
            hand.classList.add("hide");
            initializeViewer(initialImgSrc);
            document.querySelector(".best-collections__fake-viewer").classList.add("fake-viewer-none");

        });

        hand.addEventListener("touchstart", () => {
            hand.classList.add("hide");
            initializeViewer(initialImgSrc);
            document.querySelector(".best-collections__fake-viewer").classList.add("fake-viewer-none");

        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateActiveImage(currentIndex);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentIndex < imgElements.length - 1) {
                currentIndex++;
                updateActiveImage(currentIndex);
            }
        });
    }



}