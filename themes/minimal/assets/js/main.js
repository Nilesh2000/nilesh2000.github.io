const elToggleTheme = document.querySelector(".toggle input[type='checkbox']");

elToggleTheme.checked = localStorage.theme === "dark";
elToggleTheme.addEventListener("change", () => {
    const theme = elToggleTheme.checked ? "dark" : "light";
    setTheme(theme);
});

document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
