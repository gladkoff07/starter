document.addEventListener("DOMContentLoaded", function () {
  
  // menu mobile
  const buttonMenu = document.querySelector(".js-mobile-button");
  const blockMenu = document.querySelector(".menu-mobile");
  const buttonMenuClose = document.querySelector('.js-menu-close');
  const blockBody = document.querySelector("body");

  const openMenu = () => {
    blockMenu.classList.add("menu-mobile--active");
    blockBody.classList.add("body-overflow");
  };

  const closeMenu = () => {
    blockMenu.classList.remove("menu-mobile--active");
    blockBody.classList.remove("body-overflow");
  };

  buttonMenu.addEventListener("click", () => {
    openMenu();
  });

  buttonMenuClose.addEventListener("click", () => {
    closeMenu();
  });

  // clone element for mob menu
  (function () {
    // Условие для viewport шириной 1279
    const mediaQuery = window.matchMedia("(max-width: 1279px)");

    function handleTabletChange(e) {
      // Проверить, что media query будет true
      if (e.matches) {

        const introImg = document.querySelector('.intro__box')?.querySelector('.intro__img') || '';
        const introDescription = document.querySelector('.intro__content').querySelector('.intro-description');
        introDescription.before(introImg)
  
      } else {
        
        const introImgContent = document.querySelector('.intro__content')?.querySelector('.intro__img') || '';
        const introBox = document.querySelector('.intro__box');
        introBox.append(introImgContent);

        
      }
    }
    // Слушать события
    mediaQuery.addListener(handleTabletChange);

    // Начальная проверка
    handleTabletChange(mediaQuery);
  })();

  // clone element for mob menu
  (function () {
    // Условие для viewport шириной 1023
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    function handleTabletChange(e) {
      // Проверить, что media query будет true
      if (e.matches) {

        const menu = document.querySelector('.header')?.querySelector('.nav') || '';
        menu?.classList.remove('header__nav');
        const menuMobileNav = document.querySelector('.menu-mobile').querySelector('.menu-mobile__nav')
        menuMobileNav.append(menu);
  
      } else {
        document.querySelector(".menu-mobile").classList.remove("menu-mobile--active");
        document.querySelector("body").classList.remove("body-overflow");

        const menuMobileBody = document.querySelector('.menu-mobile')?.querySelector('.nav') || '';
        menuMobileBody ? menuMobileBody?.classList.add('header__nav') : null;
        const headerLogo = document.querySelector('.header').querySelector('.logo');
        headerLogo.after(menuMobileBody);
        
      }
    }
    // Слушать события
    mediaQuery.addListener(handleTabletChange);

    // Начальная проверка
    handleTabletChange(mediaQuery);
  })();

  // tabs 
  var showTabCost = function showTabCost(elTabBtn) {
    var elTab = elTabBtn.closest('.tabs');
    if (elTabBtn.classList.contains('tabs-nav__item--active')) {
      return;
    }
    var targetId = elTabBtn.dataset.targetId;
    var elTabPane = elTab.querySelector(".tabs-content__box[data-id=\"".concat(targetId, "\"]"));
    if (elTabPane) {
      var elTabBtnActive = elTab.querySelector('.tabs-nav__item--active');
      elTabBtnActive.classList.remove('tabs-nav__item--active');
      var elTabPaneShow = elTab.querySelector('.tabs-content__box--active');
      elTabPaneShow.classList.remove('tabs-content__box--active');
      elTabBtn.classList.add('tabs-nav__item--active');
      elTabPane.classList.add('tabs-content__box--active');
    }
  };
  document.addEventListener('click', function (e) {
    if (e.target && !e.target.closest('.tabs-nav__item')) {
      return;
    }
    var elTabBtn = e.target.closest('.tabs-nav__item');
    showTabCost(elTabBtn);
  });
});
