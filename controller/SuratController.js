const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

exports.indexsurat = async (req, res) => {
    try {
        const surat = await prisma.surat.findMany();
        res.render("dashboardadmin/datasurat/indexsurat", {
            title: "Data Surat | E-KantorKu",
            layout: "dashboardadmin/layouts/main",
            surat,
            msg: req.flash("msg")
        });
    } catch(error) {
        console.error("Error: ", error);
        res.status(404).send("Cannot retrieve the data!");
    }
}

exports.createSurat = (req, res) => {
    res.render("dashboardadmin/datasurat/tambahSurat", {
        title: "Halaman Form Tambah Surat",
        layout: "dashboardadmin/layouts/main"
    });
}

exports.storeSurat = async(req, res) => {
    try {
        const {jenis_surat, nomor_surat, tgl_surat, tgl_dikirim, pengirim, penerima, perihal, status} = req.body;
        const lampiran = req.file ? req.file.filename : null;

        const parsed_tgl_surat = new Date(tgl_surat);
        const parsed_tgl_dikirim = new Date(tgl_dikirim);

        await prisma.surat.create({
            data: {
                jenis_surat,
                nomor_surat,
                tgl_surat: parsed_tgl_surat,
                tgl_dikirim: parsed_tgl_dikirim,
                pengirim,
                penerima,
                perihal,
                lampiran,
                status
            }
        });

        req.flash("msg", "Data surat berhasil ditambahkan!");
        res.redirect("/admin/datasurat");
    } catch(error) {
        console.error("Error : ", error);
        res.status(404).send("Error! Could not add the data!!!");
    }
}

exports.editSurat = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const surat = await prisma.surat.findUnique({
            where: {id: id}
        }); 

        if(!surat) {
            res.send(`ID surat dengan ${id} tidak ditemukan!`);
        }

        res.render("dashboardadmin/datasurat/ubahSurat", {
            title: "Form ubah surat",
            layout: "dashboardadmin/layouts/main",
            surat
        });
    } catch(error) {
        res.status(404).send("Error! Could not find the data!");
        console.error("Error : ", error);
    }
}

exports.updateSurat  = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            req.flash("error", "Invalid ID!");
            return res.redirect("/admin/datasurat");
        }

        const { jenis_surat, nomor_surat, tgl_surat, tgl_dikirim, pengirim, penerima, perihal, status } = req.body;
        const lampiran = req.file ? req.file.filename : null;

        const parsed_tgl_surat = tgl_surat ? new Date(tgl_surat) : new Date();
        const parsed_tgl_dikirim = tgl_dikirim ? new Date(tgl_dikirim) : new Date();

        const updateData = {
            jenis_surat,
            nomor_surat,
            tgl_surat: parsed_tgl_surat,
            tgl_dikirim: parsed_tgl_dikirim,
            pengirim,
            penerima,
            perihal,
            status
        };

        if (lampiran) {
            updateData.lampiran = lampiran;
        }

        await prisma.surat.update({
            where: { id },
            data: updateData
        });

        req.flash("msg", "Data surat berhasil diubah!");
        res.redirect("/admin/datasurat");
    } catch (error) {
        res.status(404).send("Error! Could not change the data!");
        console.error("Error: ", error);
        res.redirect(`/admin/ubahSurat/${req.params.id}`);
    }
};


exports.deleteSurat = async(req, res) => {
    try {
        const id_surat = parseInt(req.params.id);
        await prisma.surat.delete({where: {id: id_surat}});

        req.flash("msg", "Data Surat berhasil dihapus!");
        res.redirect("/admin/datasurat");
    } catch(error) {
        res.status(404).send("Error! Could not delete the data!");
        console.error("Error: ", error);
    }
}

// download file atau lampiran surat
exports.downloadFile = (req, res) => {
    const filePath = path.join(__dirname, "../public/document", req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send("Error downloading file!");
        }
    });
}