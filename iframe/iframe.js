const ocr_common_langs = async (img, lang) => {

    try {
        const worker = Tesseract.createWorker({
            'workerBlobURL': false,
            'workerPath': '../tesseract/worker.min.js',
            'langPath': '../tesseract/traineddata',
            'corePath': '../tesseract/tesseract-core.asm.js'
        });

        await worker.load();
        await worker.loadLanguage(lang);
        await worker.initialize(lang);

        const { data: { text } } = await worker.recognize(img);

        await worker.terminate();

        return text;

    } catch (e) {
        return "Something went wrong! Please make sure the third party cookies are enabled on your browser or refresh the page and try again.";
    }
}


const ocr_other_langs = async (img, lang) => {
    try {
        const worker = Tesseract.createWorker({
            'workerBlobURL': false,
            'workerPath': '../tesseract/worker.min.js',
            'corePath': '../tesseract/tesseract-core.asm.js'
        });

        await worker.load();
        await worker.loadLanguage(lang);
        await worker.initialize(lang);

        const { data: { text } } = await worker.recognize(img);

        await worker.terminate();

        return text;

    } catch (e) {
        return "Something went wrong! Please refresh the page and try again.";
    }
};

chrome.runtime.sendMessage({
    message: 'get_lang_and_cropped_url_in_iframe'
}, (response) => {

    const lang = response.payload[0];
    const dataUrl = response.payload[1];

    const img = new Image();

    img.src = dataUrl;

    img.onload = () => {
        let common_langs = ['eng'];
        if (common_langs.indexOf(lang) > -1) {
            ocr_common_langs(img, lang).then((output) => {
                chrome.runtime.sendMessage({ message: "show_foreground_and_store_the_ocr_result", payload: output }, (response) => { });
            });
        } else {
            ocr_other_langs(img, lang).then((output) => {
                chrome.runtime.sendMessage({ message: "show_foreground_and_store_the_ocr_result", payload: output }, (response) => { });
            });
        }
    }
});
