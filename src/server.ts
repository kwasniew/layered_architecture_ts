import {appFactory} from "./app";
import {db} from "./connection";

(async function main() {
    const resolvedDb = await db;
    const app = appFactory(resolvedDb);

    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
})();
