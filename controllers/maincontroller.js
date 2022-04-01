module.exports = {
    home(req, res, next) {
        res.render("home")
    },
    renderShop(req, res, next) {
        res.render("shop");
    },
    renderContact(req, res, next) {
        res.render("contact");
    },
    renderReview(req, res, next) {
        res.render("review");
    }
}