exports.index = (req, res) => {
    res.render("dashboardadmin/layouts/home", {
        title: "Halaman Admin",
        layout: "dashboardadmin/layouts/main"
    });
}