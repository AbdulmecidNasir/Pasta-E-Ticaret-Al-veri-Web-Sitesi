const search = document.querySelector(".search");
const searchBtn = document.querySelector("#search-toggle")
searchBtn.addEventListener("click",function ()
{
    search.classList.toggle("active");
    document.addEventListener("click",function (e)
{
    if(!e.composedPath().includes(searchBtn) && !e.composedPath().includes(search))
    {
        search.classList.remove("active");
    }
});
});
// 3 Çizgi Butonu ve Mobil Navbar Seçimi
const menuBtn = document.getElementById('menu-btn');
const mobileNavbar = document.querySelector('.mobile-navbar');

// Menü Butonuna Tıklandığında Mobil Navbar'ı Aç/Kapat
menuBtn.addEventListener('click', function () {
    mobileNavbar.classList.toggle('active');
});

// Sayfanın Başka Bir Yerine Tıklanırsa Mobil Navbar'ı Kapat
document.addEventListener('click', function (e) {
    if (!e.composedPath().includes(menuBtn) && !e.composedPath().includes(mobileNavbar)) {
        mobileNavbar.classList.remove('active');
    }
});



