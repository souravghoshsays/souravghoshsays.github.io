/* Theme Switcher for https://souravghoshsays.github.io/ */

/** Copyright (c) 2025 Sourav Ghosh
  * All rights reserved.
  *
  * No redistribution or reuse without permission, whether in part or whole.
  * This code is provided "as is" without any warranty.
  */

const sgThemeName = 'sg-theme-name';
const sgThemeMap = {
    'sg-arunika': 'sg-theme-arunika',
    'sg-neelambari': 'sg-theme-neelambari'
};

function sgApplyTheme(theme, isManualUpdate = false) {
    const body = document.body;
    Object.values(sgThemeMap).forEach(cls => body.classList.remove(cls));
    body.classList.add(sgThemeMap[theme]);

    if (isManualUpdate) {
        const lastChanged = new Date();

        localStorage.setItem(sgThemeName, theme);
        localStorage.setItem(sgThemeName + '-last-changed', lastChanged);
    }
}

function sgInitTheme() {
    const savedLastChanged = localStorage.getItem(sgThemeName + '-last-changed');
    const savedTheme = localStorage.getItem(sgThemeName);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);  // 30 days in milliseconds
    const isSavedThemeValid = savedTheme && sgThemeMap[savedTheme];
    const isLastChangedValid = savedLastChanged && (Date.parse(savedLastChanged) > thirtyDaysAgo);

    if (!isSavedThemeValid || !isLastChangedValid) {
        localStorage.removeItem(sgThemeName);
        localStorage.removeItem(sgThemeName + '-last-changed');
    }

    const themeDefault = 'sg-neelambari';
    const themeToUse = localStorage.getItem(sgThemeName) || themeDefault;

    sgApplyTheme(themeToUse);

    const elemThemeSelect = document.getElementById('sg-theme-select')
    elemThemeSelect.value = themeToUse;

    elemThemeSelect.addEventListener('change', function(e) {
        sgApplyTheme(e.target.value, isManualUpdate = true);
    });
}
