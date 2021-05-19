
const app = require("./index").app
let port = process.env.PORT || 3000

app.listen(port, function() {
    console.log(
        "Server running. Visit: localhost:3000"
    );
});
