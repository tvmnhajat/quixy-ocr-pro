crop_btn.addEventListener("click", () => {
    let lang = document.getElementsByClassName("selected_ocr_language")[0].getAttribute("id");

    chrome.storage.local.set({ current_lang: lang }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['./content.js']
            });
            window.close();
        });
    });
});

xmark.addEventListener("click", (e) => {
    e.preventDefault();
    window.close();
});

const lang_mapper = {
    'l1': 'afr',
    'l2': 'sqi',
    'l3': 'amh',
    'l4': 'ara',
    'l5': 'hye',
    'l6': 'asm',
    'l7': 'aze',
    'l8': 'aze_cyrl',
    'l9': 'eus',
    'l10': 'bel',
    'l11': 'ben',
    'l12': 'bos',
    'l13': 'bre',
    'l14': 'bul',
    'l15': 'mya',
    'l16': 'cat',
    'l17': 'ceb',
    'l18': 'khm',
    'l19': 'chr',
    'l20': 'chi_sim',
    'l21': 'chi_tra',
    'l22': 'cos',
    'l23': 'hrv',
    'l24': 'ces',
    'l25': 'dan',
    'l26': 'dan_frak',
    'l27': 'nld',
    'l28': 'dzo',
    'l29': 'eng',
    'l30': 'enm',
    'l31': 'epo',
    'l32': 'est',
    'l33': 'fao',
    'l34': 'fil',
    'l35': 'fin',
    'l36': 'fra',
    'l37': 'frm',
    'l38': 'glg',
    'l39': 'kat',
    'l40': 'kat_old',
    'l41': 'deu',
    'l42': 'frk',
    'l43': 'deu_frak',
    'l44': 'grc',
    'l45': 'ell',
    'l46': 'guj',
    'l47': 'hat',
    'l48': 'heb',
    'l49': 'hin',
    'l50': 'hun',
    'l51': 'isl',
    'l52': 'ind',
    'l53': 'iku',
    'l54': 'gle',
    'l55': 'ita',
    'l56': 'ita_old',
    'l57': 'jpn',
    'l58': 'jav',
    'l59': 'kan',
    'l60': 'kaz',
    'l61': 'kir',
    'l62': 'kor',
    'l63': 'kor_vert',
    'l64': 'kur',
    'l65': 'kmr',
    'l66': 'lao',
    'l67': 'lat',
    'l68': 'lav',
    'l69': 'lit',
    'l70': 'ltz',
    'l71': 'mkd',
    'l72': 'msa',
    'l73': 'mal',
    'l74': 'mlt',
    'l75': 'mri',
    'l76': 'mar',
    'l77': 'equ',
    'l78': 'mon',
    'l79': 'nep',
    'l80': 'nor',
    'l81': 'oci',
    'l82': 'osd',
    'l83': 'ori',
    'l84': 'pan',
    'l85': 'fas',
    'l86': 'pol',
    'l87': 'por',
    'l88': 'pus',
    'l89': 'que',
    'l90': 'ron',
    'l91': 'rus',
    'l92': 'san',
    'l93': 'gla',
    'l94': 'srp',
    'l95': 'srp_latn',
    'l96': 'snd',
    'l97': 'sin',
    'l98': 'slk',
    'l99': 'slk_frak',
    'l100': 'slv',
    'l101': 'spa',
    'l102': 'spa_old',
    'l103': 'sun',
    'l104': 'swa',
    'l105': 'swe',
    'l106': 'syr',
    'l107': 'tgl',
    'l108': 'tgk',
    'l109': 'tam',
    'l110': 'tat',
    'l111': 'tel',
    'l112': 'tha',
    'l113': 'bod',
    'l114': 'tir',
    'l115': 'ton',
    'l116': 'tur',
    'l117': 'uig',
    'l118': 'ukr',
    'l119': 'urd',
    'l120': 'uzb',
    'l121': 'uzb_cyrl',
    'l122': 'vie',
    'l123': 'cym',
    'l124': 'fry',
    'l125': 'yid',
    'l126': 'yor'
};

const dropdown = document.getElementById("quixy_ocr_popup_dropbtn");

const selected_language = document.getElementsByClassName("selected_ocr_language")[0];

const dropdown_caret = document.querySelector("#quixy_ocr_popup_dropbtn > i");

dropdown.onclick = () => {
    showDropdownContent();
}

selected_language.onclick = (e) => {
    e.stopPropagation();
    showDropdownContent();
}

dropdown_caret.onclick = (e) => {
    e.stopPropagation();
    showDropdownContent();
}

function showDropdownContent() {
    document.getElementsByClassName("quixy_ocr_popup_dropdown_content")[0].classList.toggle("quixy_ocr_popup_dropdown_content_show");
}

window.onclick = function (event) {
    if (!event.target.matches('.selected_ocr_language') & !event.target.matches('#quixy_ocr_popup_dropbtn')) {
        for (let i = 1; i <= Object.keys(lang_mapper).length; i++) {
            let id = '#l' + i.toString();
            if (event.target.matches(id)) {
                document.querySelector("#quixy_ocr_popup_dropbtn > span").innerText = event.target.innerText;
                document.getElementsByClassName("selected_ocr_language")[0].setAttribute("id", lang_mapper["l" + i.toString()]);
            }
        }
        var dropdowns = document.getElementsByClassName("quixy_ocr_popup_dropdown_content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('quixy_ocr_popup_dropdown_content_show')) {
                openDropdown.classList.remove('quixy_ocr_popup_dropdown_content_show');
            }
        }
    }
}




