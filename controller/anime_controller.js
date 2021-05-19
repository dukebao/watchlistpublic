let animeController = {
    list: (req, res) => {
        res.render("anime/list");
    },

    home: (req, res) => {
        res.render("anime/index")
    }
};

module.exports = animeController;