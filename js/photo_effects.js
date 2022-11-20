// photo_effects.js — модуль работы с эффектами изображения.

import{EFFECTS} from './constants.js';

const imgPreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');

let changeEffects = EFFECTS[5];
const theDefault = () => changeEffects === EFFECTS[5];

//функция изменения видимости и обновления слайдера с новыми параметрами
const getSlider = () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: changeEffects.min,
      max: changeEffects.max,
    },
    step: changeEffects.step,
    start: changeEffects.max,
  });

  if(theDefault()) {
    slider.classList.add('hidden');
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

//функция для передачи в обработчик выбор нужного импута с эффектом, с условием от которого зависит, какие параметры передать
const onListChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return evt.target.classList.contains('effects__radio');
  } else {
    //находим в массиве необходимое значение эффекта кликнутого элемента и присваем значение к переменной
    changeEffects = EFFECTS.find((effect) => effect.name === evt.target.value);
    getSlider();
  }
};

// функция добавления слайдеру необходимых нам стилей фильтров, класса и данных текста
const onSliderUpdate = () => {
  imgPreview.style.filter = 'none';
  imgPreview.className = '';
  imgPreview.value = '';
  if (theDefault()) {
    return theDefault();
  } else {
    const newValueSlider = slider.noUiSlider.get();
    imgPreview.style.filter = `${changeEffects.style}(${newValueSlider}${changeEffects.unit})`;
    imgPreview.classList.add(`effects__preview--${changeEffects.name}`);
    effectValue.value = slider;
  }
};

//сброс эффектов
const resetSliderImg = () => {
  changeEffects = EFFECTS[5];
  getSlider();
};

noUiSlider.create(slider, {
  range: {
    min: EFFECTS[5].min,
    max: EFFECTS[5].max,
  },
  start: EFFECTS[5].max,
  step: EFFECTS[5].step,
  connect: 'lower',
});


const getEffectSlider = () => {
  getSlider();
  //изменение параметров слайдера и эффекта при нажатии
  effectList.addEventListener('change', onListChange);
  //слушатель изменения положения слайдера
  slider.noUiSlider.on('update', onSliderUpdate);
};

export{getEffectSlider, resetSliderImg};
