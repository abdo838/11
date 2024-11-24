// الدالة لتحديث سجل الصفحات
function updateHistory() {
    const pageTitle = document.title;
    const pageUrl = window.location.href;

    // جلب السجل الحالي من LocalStorage
    let history = JSON.parse(localStorage.getItem("pageHistory")) || [];

    // التحقق إذا كانت الصفحة موجودة بالفعل في السجل لتجنب التكرار
    const isPageAlreadyInHistory = history.some(entry => entry.url === pageUrl);
    if (!isPageAlreadyInHistory) {
        // إضافة الصفحة الحالية للسجل
        history.push({ title: pageTitle, url: pageUrl });

        // تخزين السجل المحدث
        localStorage.setItem("pageHistory", JSON.stringify(history));
    }
}

// الدالة لعرض السجل
function displayHistory() {
    const historyList = document.createElement("ul");
    historyList.style = "list-style-type: none; padding: 0; direction: rtl;";

    const history = JSON.parse(localStorage.getItem("pageHistory")) || [];

    history.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.style = "margin: 5px 0; padding: 10px; border: 1px solid #ddd; background: #fff; border-radius: 5px;";
        listItem.innerHTML = `<a href="${entry.url}" target="_blank">${entry.title}</a>`;
        historyList.appendChild(listItem);
    });

    // إنشاء نافذة لعرض السجل
    const historyWindow = document.createElement("div");
    historyWindow.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        background: #f9f9f9;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "إغلاق";
    closeButton.style = "background: #d9534f; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;";
    closeButton.onclick = () => document.body.removeChild(historyWindow);

    const historyTitle = document.createElement("h3");
    historyTitle.textContent = "سجل الصفحات:";
    historyTitle.style = "margin-bottom: 10px;";

    historyWindow.appendChild(historyTitle);
    historyWindow.appendChild(historyList);
    historyWindow.appendChild(closeButton);

    document.body.appendChild(historyWindow);
}

// عند تحميل الصفحة، تحديث السجل
window.onload = () => {
    updateHistory();

    // إذا أردت عرض السجل مباشرة على كل صفحة
    displayHistory();
};
