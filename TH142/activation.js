function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
  
    var mainInterval = setInterval(check, 50);
  
    function check() {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;
  
      if (dif > 5) {
        clearInterval(mainInterval);
        console.log('Timeout');
      } else if (
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        window.digitalData.page.category.pageType === 'pdp' &&
        document.querySelector('[class*="product-image__image_"]') &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.siteDeviceVersion &&
        window.digitalData.site.attributes.siteDeviceVersion === 'mobile' &&
        window.digitalData.product &&
        window.digitalData.product[0] &&
        window.digitalData.product[0].productInfo &&
        window.digitalData.product[0].productInfo.productId &&
        document.querySelector('[class*="product-image__image_"]').srcset.split(',')[0] &&
        document.querySelector('[class*="carousel__wrapper_"] [class*="product-image__image_"]').srcset &&
        document.querySelector('[class*="carousel__wrapper_"] [class*="product-image__image_"]').srcset.split(',') &&
        document.querySelector('[class*="carousel__wrapper_"] [class*="product-image__image_"]').srcset.split(',')[0]
      ) {
        activate();
        clearInterval(mainInterval);
      }
    }
  }












const utils = window["optimizely"].get("utils");

const fireAdobeEvent = (eventName) => {
   utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function() {
      window.s.tl(this,"o", eventName);
  });
};

const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  });
};

const fireBothEvents = (eventName, isAuto) => {
  fireAdobeEvent(eventName);
  fireOptimizelyEvent(eventName);
};


utils.waitForElement('[data-testid="mega-menu-first-level"] .mega-menu__second-level [data-testid="mega-menu-second-level-items"] [style*="color"]').then(function() {
   
    const saleNavLinks = document.querySelectorAll('[data-testid="mega-menu-first-level"] .mega-menu__second-level [data-testid="mega-menu-second-level-items"] [style*="color"]');
 
    // ------ Custom Goal #1.1 - 'CK265-Open-sale-category-in-main-menu' (Mobile) ----- //
    saleNavLinks.forEach(function(saleLink) {
        saleLink.parentElement.parentElement.addEventListener('click', function() {
            if (saleLink.parentElement.parentElement.getAttribute('data-testid') !== 'mega-menu-second-level-items-active' && !document.querySelectorAll('.mega-menu.--desktop').length) {
                 fireBothEvents('CK265-Open-sale-category-in-main-menu');
            }
        });
    });
 
        // ------ Custom Goal #1.2 - 'CK265-Open-sale-category-in-main-menu' (Desktop) ----- //
        saleNavLinks.forEach(function(saleLink) {
         saleLink.parentElement.parentElement.addEventListener('mouseenter', function() {
             if (document.querySelectorAll('.mega-menu.--desktop').length) {
                 fireBothEvents('CK265-Open-sale-category-in-main-menu');
             }
         });
     });
 
     // ------ Custom Goal #2 - 'CK265-Click-on-sub-element-in-Sale-Category-menu' ----- //
     saleNavLinks.forEach(function(saleLink) {
         saleLink.parentElement.parentElement.querySelectorAll('.mega-menu__third-level li').forEach(function(saleSubCategory) {
             saleSubCategory.addEventListener('click', function() {
                 fireBothEvents('CK265-Click-on-sub-element-in-Sale-Category-menu');
             });
         });
     });
 });