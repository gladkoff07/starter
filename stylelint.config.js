/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // Конвенция проекта: camelCase с необязательным суффиксом через
    // подчёркивание ($colorSmokyWhite_F2, $tabletLandscape_1280),
    // а также kebab-case ($cor1-rh). Дефолт правила — строго kebab-case.
    'scss/dollar-variable-pattern': '^-?[a-z][a-zA-Z0-9]*([-_][a-zA-Z0-9]+)*$',
    'scss/at-mixin-pattern': '^-?[a-z][a-zA-Z0-9]*([-_][a-zA-Z0-9]+)*$',
  },
}