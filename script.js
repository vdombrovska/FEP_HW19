let stiker = {};
let stikersList =[];
let textArea;
let $textArea = $('#text');
const $stickersList = $ ('#sticker-block');
const $sticker = $ ('#stikerItem');
const STIKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';
const ADD_BTN_CLASS = 'btn-add';
const STORAGE_KEY = 'list';
const DELETE_BTN_CLASS = 'btn-delete';
const EDIT_CLASS = 'edit';
const STICKER_ITEM_CLASS = '.sticker-item';
document.addEventListener ('click', onBtnAddCLick);

$stickersListEl.on ('click','.'+ DELETE_BTN_CLASS,onBtnDeleteClick);
$textAreaEl.document.addEventListener ('focusout',onTextAreaClick);

init();

function init() {
    fetchStikersList();
}

function fetchStikersList() {
    fetch(STIKERS_URL)
    .then((res) => res.json())
    .then((data) => {
        stikersList = data;
        renderStikersList()
    })
}

function onBtnAddCLick () {
    createNewStiker();
    renderStikersList();
}

function createNewStiker (data) {
    return fetch(this.STIKERS_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
}

function renderStikersList() {
    $stickersList.html(stikersList.map(createNewStickerHTML).join('\n'));
} 

function createNewStickerHTML (sticker){
    return  TITLE_ITEM_TEMPLATE.replace('{{id}}', sticker.id)
            .replace('{{description}}', sticker.description)
}

function onBtnDeleteClick (){
    const id = getStickerId(el.target,selector);
    deleteSticker(elem);
    renderStikersList();

}
function getStickerId(el) {
    const $el = $(el);
    const $sticker = $el.closest(STICKER_ITEM_CLASS);
    return String($sticker.data('id'));
}

function deleteSticker(elem){
    fetch(API_URL + elem.id, {
        method: 'DELETE',
    }).then((data) => {
        fetchStikersList();
    })
}

function onTextAreaClick() {
    const id = getStickerId(el.target);
    elem = el.target.stikersList.contains(EDIT_CLASS);
    getCustumersText();
    editCusrtumersText();
    renderStikersList();
}

function getCustumersText(){
    return $textArea.val();
}

function editCusrtumersText(sticker){
    return fetch(API_URL + sticker.id, {
        method: 'PUT',
        body: JSON.stringify(sticker),
        headers: {
            'Content-Type': 'application/json',
            },
    }).then((res) => res.json());
}
