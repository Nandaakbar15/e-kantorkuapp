const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {index} = require("../controller/AdminController");
const {indexsurat, createSurat, storeSurat, editSurat, updateSurat, deleteSurat, downloadFile} = require("../controller/SuratController");

router.get("/", (req, res) => {
    res.redirect('/admin/dashboard');
})

// view halaman utama admin
router.get("/admin/dashboard", index);

router.get("/admin/datasurat", indexsurat);

// route view form tambah surat
router.get("/admin/datasurat/viewtambahsurat", createSurat);

// logic tambah surat
router.post("/admin/tambahSurat", upload.single("lampiran"), storeSurat);

// route view form ubah surat
router.get("/admin/viewdatasurat/edit/:id", editSurat);

// logic ubah surat
router.put("/admin/ubahSurat/:id", upload.single("lampiran"), updateSurat);

// hapus surat
router.delete("/admin/datasurat/:id", deleteSurat);

// download file
router.get("/download/:filename", downloadFile);

module.exports = router;