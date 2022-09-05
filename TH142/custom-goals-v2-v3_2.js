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



let TH142_hasSeenSecondImage = false;
let TH142_hasSeenMiddleImage = false;
let TH142_hasSeenLastImage = false;
let TH142_mutationObserverConnected = false;

function observeStepperWrapper(targetNode) {

    TH142_mutationObserverConnected = true;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    const secondImage = document.querySelectorAll('.stepper-wrapper .step')[1];
    const middleImage = document.querySelectorAll('.stepper-wrapper .step').length % 2 === 0 ?
                            document.querySelectorAll('.stepper-wrapper .step')[document.querySelectorAll('.stepper-wrapper .step').length / 2] :
                            document.querySelectorAll('.stepper-wrapper .step')[Math.floor(document.querySelectorAll('.stepper-wrapper .step').length / 2)];
    const lastImage = document.querySelectorAll('.stepper-wrapper .step')[document.querySelectorAll('.stepper-wrapper .step').length - 1];


    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            if (secondImage.classList.contains('step-active') && !TH142_hasSeenSecondImage) {
                fireBothEvents('TH142 - Second image swiped into view');
                TH142_hasSeenSecondImage = true;
            } else if (middleImage.classList.contains('step-active') && !TH142_hasSeenMiddleImage) {
                fireBothEvents('TH142 - Middle image swiped into view');
                TH142_hasSeenMiddleImage = true;
            } else if (lastImage.classList.contains('step-active') && !TH142_hasSeenLastImage) {
                fireBothEvents('TH142 - Last image swiped into view');
                TH142_hasSeenLastImage = true;
            }
        }
    }

    if (TH142_hasSeenSecondImage && TH142_hasSeenMiddleImage && TH142_hasSeenLastImage) {
        observer.disconnect();
        TH142_mutationObserverConnected = false;
    };
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
}

utils.waitForElement('.stepper-wrapper').then(function(stepperWrapper) {
    if (!TH142_mutationObserverConnected) {
	    observeStepperWrapper(stepperWrapper);
    }
});

utils.waitForElement('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]').then(function(colourSelector) {

    utils.observeSelector('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]', function() {


        utils.waitForElement('.stepper-wrapper').then(function(stepperWrapper) {
            if (!TH142_mutationObserverConnected) {
                TH142_hasSeenSecondImage = false;
                TH142_hasSeenMiddleImage = false;
                TH142_hasSeenLastImage = false;

                observeStepperWrapper(stepperWrapper);
            }
        });
    })
}) 