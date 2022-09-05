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




let TH142_hasSeenMiddleImage = false;
let TH142_mutationObserverConnected = false;

function observeStepperWrapper(targetNode) {

    TH142_mutationObserverConnected = true;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    const middleImage = document.querySelectorAll('.exp-thumbnails-container .exp-thumb').length % 2 === 0 ?
                            document.querySelectorAll('.exp-thumbnails-container .exp-thumb')[document.querySelectorAll('.exp-thumbnails-container .exp-thumb').length / 2] :
                            document.querySelectorAll('.exp-thumbnails-container .exp-thumb')[Math.floor(document.querySelectorAll('.exp-thumbnails-container .exp-thumb').length / 2)];


    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (middleImage.classList.contains('exp-thumb-active') && !TH142_hasSeenMiddleImage) {
                fireBothEvents('TH142 - Middle image swiped into view');
                TH142_hasSeenMiddleImage = true;
            }
        }
    }

    if (TH142_hasSeenMiddleImage) {
        observer.disconnect();
        TH142_mutationObserverConnected = false;
    };
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
}

utils.waitForElement('.exp-thumbnails-container').then(function(thumbnailContainer) {
    if (!TH142_mutationObserverConnected) {
	    observeStepperWrapper(thumbnailContainer);
    }
});

utils.waitForElement('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]').then(function(colourSelector) {

    utils.observeSelector('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]', function() {


        utils.waitForElement('.exp-thumbnails-container').then(function(thumbnailContainer) {
            if (!TH142_mutationObserverConnected) {
                TH142_hasSeenMiddleImage = false;

                observeStepperWrapper(thumbnailContainer);
            }
        });
    })
}) 