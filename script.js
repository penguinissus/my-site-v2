function setupSide(containerSelector, rowClass) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const templateRow = container.querySelector('.' + rowClass);
    if (!templateRow) return;

    let originalImages = Array.from(templateRow.querySelectorAll('img')).map(img => img.src);
    if (originalImages.length === 0) return;

    // Clear everything except template row, reset template row
    container.innerHTML = '';
    container.appendChild(templateRow);
    templateRow.innerHTML = '';
    originalImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        templateRow.appendChild(img);
    });

    const containerWidth = container.clientWidth;
    const rowHeight = templateRow.offsetHeight;
    const gap = parseFloat(getComputedStyle(container).rowGap) || 0;
    const containerHeight = container.clientHeight;

    if (rowHeight === 0) return;

    const count = Math.ceil((containerHeight + gap) / (rowHeight + gap));

    function setupRow(row) {
        while (row.scrollWidth < containerWidth + 300) {
            originalImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                row.appendChild(img);
            });
        }
        const randomOffset = Math.floor(Math.random() * 200);
        row.style.marginLeft = `-${randomOffset}px`;
    }

    setupRow(templateRow);

    for (let i = 1; i < count; i++) {
        const clone = templateRow.cloneNode(true);
        const randomOffset = Math.floor(Math.random() * 200);
        clone.style.marginLeft = `-${randomOffset}px`;
        container.appendChild(clone);
    }
}

function initAll() {
    setupSide('.head-left', 'head-left-row');
    setupSide('.head-right', 'head-right-row');
}

window.addEventListener('load', initAll);
window.addEventListener('resize', initAll);