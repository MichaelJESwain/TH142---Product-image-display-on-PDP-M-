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
        document.querySelector('[class*="carousel__wrapper_"]') &&
        document.querySelector('[class*="carousel__wrapper_"] img') &&
        document.querySelectorAll('[class*="carousel__wrapper_"] img').length > 1 &&
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
