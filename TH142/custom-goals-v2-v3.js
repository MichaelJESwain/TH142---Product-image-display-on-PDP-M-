const utils = window["optimizely"].get("utils");
console.log('th142 - 5');

let TH142_hasSeenSecondImage = false;
let TH142_hasSeenMiddleImage = false;
let TH142_hasSeenLastImage = false;
let TH142_mutationObserverExists = false;

function observeStepperWrapper(targetNode) {
    console.log('TH142 - creating mutation observer');

    TH142_mutationObserverExists = true;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    console.log('mutation observed... calling callback');

    const secondImage = document.querySelectorAll('.stepper-wrapper .step')[1];
    const middleImage = document.querySelectorAll('.stepper-wrapper .step').length % 2 === 0 ?
                            document.querySelectorAll('.stepper-wrapper .step')[document.querySelectorAll('.stepper-wrapper .step').length / 2] :
                            document.querySelectorAll('.stepper-wrapper .step')[Math.floor(document.querySelectorAll('.stepper-wrapper .step').length / 2)];
    const lastImage = document.querySelectorAll('.stepper-wrapper .step')[document.querySelectorAll('.stepper-wrapper .step').length - 1];


    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
            if (secondImage.classList.contains('step-active') && !TH142_hasSeenSecondImage) {
                console.log('TH142 - Second image swiped into view');
                TH142_hasSeenSecondImage = true;
            } else if (middleImage.classList.contains('step-active') && !TH142_hasSeenMiddleImage) {
                console.log('TH142 - Middle image swiped into view');
                TH142_hasSeenMiddleImage = true;
            } else if (lastImage.classList.contains('step-active') && !TH142_hasSeenLastImage) {
                console.log('TH142 - Last image swiped into view');
                TH142_hasSeenLastImage = true;
            }
        }
    }

    if (TH142_hasSeenSecondImage && TH142_hasSeenMiddleImage && TH142_hasSeenLastImage) {
        console.log('user has seen all images... disconnecting mutation observer');
        observer.disconnect();
    };
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
}

utils.waitForElement('.stepper-wrapper').then(function(stepperWrapper) {
    console.log('stepper wrapper element found... calling observeStepperWrapper()');
    if (!TH142_mutationObserverExists) {
	    observeStepperWrapper(stepperWrapper);
    }
});

utils.waitForElement('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]').then(function(colourSelector) {

    utils.observeSelector('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]', function() {
        console.log('colour change');
        TH142_hasSeenSecondImage = false;
        TH142_hasSeenMiddleImage = false;
        TH142_hasSeenLastImage = false;

        utils.waitForElement('.stepper-wrapper').then(function(stepperWrapper) {
            if (!TH142_mutationObserverExists) {
                console.log('stepper wrapper element found 2... calling observeStepperWrapper()');
                observeStepperWrapper(stepperWrapper);
            }
        });
    })
}) 