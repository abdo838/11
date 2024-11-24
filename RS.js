

const historyKey = "browsingHistory";

// الحصول على السجل الموجود أو إنشاء سجل جديد
let history = JSON.parse(localStorage.getItem(historyKey)) || [];

// إضافة الصفحة الحالية إلى السجل
function addToHistory(pageName) {
    history.push(pageName);
    localStorage.setItem(historyKey, JSON.stringify(history));
}

// عرض السجل في الصفحة إذا كان هناك قائمة لعرضه
function displayHistory() {
    const historyList = document.getElementById("history-list");
    if (historyList) {
        historyList.innerHTML = ""; // تفريغ القائمة

        if (history.length === 0) {
            historyList.innerHTML = "<li>لا يوجد سجل حتى الآن</li>";
        } else {
            history.forEach((page) => {
                const listItem = document.createElement("li");
                listItem.textContent = page;
                historyList.appendChild(listItem);
            });
        }
    }
}

// مسح السجل
function clearHistory() {
    history = []; // إفراغ السجل في الذاكرة
    localStorage.removeItem(historyKey); // إزالة السجل من localStorage
    displayHistory(); // تحديث العرض
}

// عكس ترتيب السجل
function reverseHistory() {
    history.reverse(); // عكس ترتيب المصفوفة
    localStorage.setItem(historyKey, JSON.stringify(history)); // تحديث localStorage
    displayHistory(); // تحديث العرض
}

// إضافة الأحداث للزرين
document.getElementById("clear-history").addEventListener("click", clearHistory);
document.getElementById("reverse-history").addEventListener("click", reverseHistory);

// عند تحميل الصفحة
const currentPage = document.title || "صفحة غير معنونة";
addToHistory(currentPage); // إضافة الصفحة الحالية
displayHistory(); // عرض السجل
