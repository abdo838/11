// الدالة لتحديث سجل الصفحات
function updateHistory() {
    const pageTitle = document.title;
    const pageUrl = window.location.href;

    // جلب السجل الحالي من LocalStorage
    let history = JSON.parse(localStorage.getItem("pageHistory")) || [];

    // إضافة الصفحة الحالية للسجل
    history.push({ title: pageTitle, url: pageUrl });

    // تخزين السجل المحدث
    localStorage.setItem("pageHistory", JSON.stringify(history));

    // عرض السجل في الصفحة
    displayHistory(history);
}

// الدالة لعرض السجل
function displayHistory(history) {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    history.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${entry.url}" target="_blank">${entry.title}</a>`;
        historyList.appendChild(listItem);
    });
}

// عند تحميل الصفحة، تحديث السجل وعرضه
window.onload = () => {
    const history = JSON.parse(localStorage.getItem("pageHistory")) || [];
    displayHistory(history);
    updateHistory();
};
