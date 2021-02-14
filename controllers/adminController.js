exports.getHomePage = (req, res, next) => {
    res.render('awesomeshop', {
        pageTitle: 'Awesome Shop',
    })
}

exports.getProductPage = (req, res, next) => {
    res.render('product', {
        pageTitle: 'Awesome Shop',
    })
}