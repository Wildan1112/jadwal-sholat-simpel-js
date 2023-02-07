// Ambil tanggal
const getDate = new Date();
const year = getDate.getFullYear();
const month = getDate.getMonth() + 1;
const day = getDate.getDate();

function bulan()
{
    if(month < 10){
        bulan = `0${month}`
    } else {
        bulan = month
    }
    return bulan
}

function hari(){
    if (day < 10) {
        hari = `0${day}`
    } else {
        hari = day
    }
    return hari
}

const tanggal = `${year}-${bulan()}-${hari()}`

const tampilLokasi = document.querySelector('.nama-lokasi')
tampilLokasi.textContent = "Lokasi : " + localStorage.namaLokasi

function getJadwalSholat() {

  fetch(
    "https://api.banghasan.com/sholat/format/json/jadwal/kota/" + parseInt(localStorage.idkota) + "/tanggal/"+ tanggal
  )
    .then((response) => response.json())
    .then((data) => {
      const jadwal = data.jadwal.data;
      console.log(jadwal);

      document.querySelector(".imsak").textContent = jadwal.imsak;
      document.querySelector(".subuh").textContent = jadwal.subuh;
      document.querySelector(".terbit").textContent = jadwal.terbit;
      document.querySelector(".dzuhur").textContent = jadwal.dzuhur;
      document.querySelector(".ashar").textContent = jadwal.ashar;
      document.querySelector(".maghrib").textContent = jadwal.maghrib;
      document.querySelector(".isya").textContent = jadwal.isya;
      document.querySelector(".tanggal").textContent = jadwal.tanggal;
    });
}

// Pilih Lokasi
const inputSearch = document.querySelector('.input-search')
const cardList = document.querySelector('.card-list')

inputSearch.addEventListener('keyup', function () {
    const valueSearch = inputSearch.value.length

    if (valueSearch > 0) {
        cardList.classList.remove('hidden-list')

        fetch('https://api.banghasan.com/sholat/format/json/kota')
        .then((response) => response.json())
        .then(data => {
            const kota = data.kota
            let listKota = ''
            kota.forEach(k => {
                listKota += ` <a href="#" id="nama-kota" data-idkota="${k.id}" class="list-group-item list-group-item-action">${k.nama}</a>`
            })

            const namaKota = document.querySelector('.card-list')
            namaKota.innerHTML = listKota

            // kota diklik
            const isiKota = document.querySelectorAll('#nama-kota')
            isiKota.forEach(kota => {
                const cariText = inputSearch.value.toLowerCase();
                const itemText = kota.firstChild.textContent.toLowerCase()

                if(itemText.indexOf(cariText) != -1) {
                    kota.setAttribute('style', 'display: block');
                } else {
                    kota.setAttribute('style', 'display: none !important');
                }

                kota.addEventListener('click', function(){
                    const idKota = this.dataset.idkota
                    const namaLokasi = this.textContent
                
                    window.localStorage.setItem('idkota', idKota)
                    window.localStorage.setItem('namaLokasi', namaLokasi)
                    

                    namaKota.classList.add('hidden-list')
                    inputSearch.value = ''
                    location.reload()
                    console.log(idKota);
                })
            })
        })
    } else {
        cardList.classList.add('hidden-list')
    }
})

getJadwalSholat();
